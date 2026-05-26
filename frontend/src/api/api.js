import axios from "axios";

const API = axios.create({
baseURL: "https://hotel-system-xrzy.onrender.com/api"
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;