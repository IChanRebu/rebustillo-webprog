# Server & Client Connection Setup

## ✅ Fixes Applied
1. **Fixed userRoutes.js** - Converted from ES6 modules to CommonJS to match server config
2. **Fixed articleRoutes.js** - Now imports from correct `articleController`
3. **Created articleController.js** - Added proper CRUD functions for articles

## 🚀 Running the Application

### Prerequisites
Ensure both folders have dependencies installed:

```bash
# Install server dependencies
cd rebustillo-server
npm install

# Install client dependencies  
cd ../rebustillo-client
npm install
```

### Start the Server
Open a terminal in the `rebustillo-server` directory:

```bash
npm run dev
# Or for production:
npm start
```

The server will run on **http://localhost:8000** (configured in `.env`)

### Start the Client
Open another terminal in the `rebustillo-client` directory:

```bash
npm run dev
```

The client will run on **http://localhost:5173** (default Vite port)

## 📡 API Endpoints

### User Routes (`/api/users`)
- **GET** `/api/users` - Get all users
- **POST** `/api/users` - Create new user
- **POST** `/api/users/login` - Login user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Article Routes (`/api/articles`)
- **GET** `/api/articles` - Get all articles
- **POST** `/api/articles` - Create new article
- **PUT** `/api/articles/:id` - Update article
- **DELETE** `/api/articles/:id` - Delete article

## 🔌 Client Configuration

The client is already configured to call the server via:
- **AuthService.js** - Uses `http://localhost:8000/api`
- **UserService.js** - Uses axios with the same base URL

Environment variables are set in `.env` files:
- **Development** (`.env`): `VITE_API_BASE_URL=http://localhost:8000/api`
- **Production** (`.env.production`): Update with your deployed backend URL

## ✅ Verification

Once both are running, you should see:
1. Client running at `http://localhost:5173`
2. Server running at `http://localhost:8000`
3. CORS enabled for cross-origin requests
4. No console errors about connection issues
