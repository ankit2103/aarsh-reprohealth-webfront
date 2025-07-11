import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL , // || "http://localhost:5000/api"
  headers: { 
    "Content-Type": "application/json",
    // authKey: process.env.NEXT_PUBLIC_API_AUTH_KEY,
   },
});

// Attach token to headers automatically
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
    },
  (error) => {
    return Promise.reject(error);
});

export default apiClient;
