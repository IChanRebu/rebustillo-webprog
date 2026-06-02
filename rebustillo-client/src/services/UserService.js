const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/users';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || response.statusText || 'Request failed');
  }
  return response.json();
};

const getUsers = async () => {
  const response = await fetch(API_URL, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

const createUser = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

const updateUser = async (id, payload) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
