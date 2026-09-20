import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_PROD === "production"
      ? "https://algoarena-server-hqur.onrender.com/api/v1"
      : "http://localhost:8080/api/v1",
  withCredentials: true,
});

