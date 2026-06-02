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