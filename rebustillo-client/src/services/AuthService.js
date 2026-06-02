const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const handleResponse = async (response) => {
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(json?.message || response.statusText || 'Request failed');
  }
  return json;
};

const login = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error('Unable to reach backend server. Please check your API URL and network connectivity.');
  }
};

const register = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error('Unable to reach backend server. Please check your API URL and network connectivity.');
  }
};

const setAuth = (authData) => {
  localStorage.setItem('auth', JSON.stringify(authData));
};

const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('auth')) || null;
  } catch (error) {
    return null;
  }
};

const logout = () => {
  localStorage.removeItem('auth');
};

export default {
  login,
  register,
  setAuth,
  getAuth,
  logout,
};
