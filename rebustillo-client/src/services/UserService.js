import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

export const fetchUsers = () => {
  return API.get("/");
};

export const createUser = (user) => {
  return API.post("/", user);
};

export const updateUser = (id, user) => {
  return API.put(`/${id}`, user);
};

export const deleteUser = (id) => {
  return API.delete(`/${id}`);
};

export const loginUser = (credentials) => {
  return API.post("/login", credentials);
};

// Default export with the method names that pages expect
const UserService = {
  getUsers: async () => {
    const { data } = await fetchUsers();
    return data;
  },
  createUser: async (user) => {
    const { data } = await createUser(user);
    return data;
  },
  updateUser: async (id, user) => {
    const { data } = await updateUser(id, user);
    return data;
  },
  deleteUser: async (id) => {
    const { data } = await deleteUser(id);
    return data;
  },
  loginUser,
};

export default UserService;