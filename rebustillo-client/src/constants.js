const rawHost = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const normalizedHost = rawHost.replace(/\/+$/, '');
const HOST = normalizedHost.endsWith('/api') ? normalizedHost : `${normalizedHost}/api`;

const constants = {
  HOST,
};

export default constants;
