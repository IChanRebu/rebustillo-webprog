import User from '../models/User.js';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersJsonPath = path.join(__dirname, '..', '..', 'lagudgud-client', 'src', 'data', 'users.json');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

const toClientUser = (user) => {
    const userObject = user.toObject ? user.toObject() : user;
    const { _id, __v, ...rest } = userObject;
    return {
        id: String(_id || rest.id),
        ...rest,
        role: rest.role || rest.type || 'viewer',
    };
};

const readUsersJson = async () => {
    try {
        const file = await fs.readFile(usersJsonPath, 'utf8');
        return JSON.parse(file);
    } catch {
        return [];
    }
};

const writeUsersJson = async (users) => {
    if (isProduction) {
        // In production deployments like Vercel, the filesystem is read-only.
        // We keep server persistence in the database and skip JSON writes here.
        return;
    }

    await fs.writeFile(usersJsonPath, `${JSON.stringify(users, null, 2)}\n`);
};

const upsertUserJson = async (user) => {
    const users = await readUsersJson();
    const nextUser = toClientUser(user);
    const existingIndex = users.findIndex((item) => String(item.id) === nextUser.id);

    if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...nextUser };
    } else {
        users.push(nextUser);
    }

    await writeUsersJson(users);
};

const removeUserJson = async (id) => {
    const users = await readUsersJson();
    await writeUsersJson(users.filter((user) => String(user.id) !== String(id)));
};

const normalizeUserInput = (user) => ({
    firstName: String(user.firstName || '').trim(),
    lastName: String(user.lastName || '').trim(),
    age: String(user.age || '').trim(),
    gender: String(user.gender || '').trim().toLowerCase(),
    contactNumber: String(user.contactNumber || '').trim(),
    email: String(user.email || '').trim().toLowerCase(),
    role: user.role || user.type || 'viewer',
    username: String(user.username || '').trim().toLowerCase(),
    password: String(user.password || ''),
    address: String(user.address || '').trim(),
    isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const isHashedPassword = (password) => /^\$2[aby]\$\d{2}\$/.test(password);

const seedUsersFromJson = async () => {
    const users = await readUsersJson();

    for (const rawUser of users) {
        const userData = normalizeUserInput(rawUser);
        if (!userData.email || !userData.username || !userData.password) continue;

        const password = isHashedPassword(userData.password)
            ? userData.password
            : await bcrypt.hash(userData.password, 10);

        const usernameUser = await User.findOne({ username: userData.username });
        const emailUser = await User.findOne({ email: userData.email });
        const existingUser = usernameUser || emailUser;

        if (usernameUser && emailUser && String(usernameUser._id) !== String(emailUser._id)) {
            await User.findByIdAndDelete(emailUser._id);
        }

        if (existingUser) {
            await User.findByIdAndUpdate(existingUser._id, { ...userData, password }, { returnDocument: 'after' });
        } else {
            await User.create({ ...userData, password });
        }
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.json({ users: users.map(toClientUser) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        // Ensure the password is included in the request body
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const email = String(req.body.email || '').trim().toLowerCase();
        const username = String(req.body.username || '').trim().toLowerCase();
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            const field = existingUser.email === email ? 'Email address' : 'Username';
            return res.status(409).json({ message: `${field} already exists` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user with the hashed password
        const user = await User.create({
            ...req.body,
            email,
            username,
            role: req.body.role || req.body.type || 'viewer',
            password: hashedPassword,
        });

        if (!isProduction) {
            await upsertUserJson(user);
        }

        res.status(201).json(toClientUser(user));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.body.role || req.body.type) {
            updateData.role = req.body.role || req.body.type;
        }
        delete updateData.type;

        // Check if the password is being updated
        if (updateData.password) {
            // Hash the new password
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update the user with the new data
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { returnDocument: 'after' });

        if (!user) {
            return res.status(404).json({ message: 'User not found in database' });
        }

        if (!isProduction) {
            await upsertUserJson(user);
        }

        res.json(toClientUser(user));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found in database' });
        }

        if (!isProduction) {
            await removeUserJson(req.params.id);
        }

        res.json({ message: 'User deleted successfully from server' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is active
        if (!user.isActive) {
            return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const role = user.role || user.type || 'viewer';
        const token = jwt.sign(
            { id: user._id, email: user.email, role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, role, firstName: user.firstName }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getUsers, createUser, updateUser, deleteUser, loginUser, seedUsersFromJson };