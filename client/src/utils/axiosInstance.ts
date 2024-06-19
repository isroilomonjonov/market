import axios from "axios";

// export const serviceURL = "http://localhost:9090/api/v1";
export const serviceURL = "https://market-production-c362.up.railway.app/api/v1";
// export const imageURL = "http://localhost:9090/img/";
export const imageURL = "https://market-production-c362.up.railway.app/img/";
const axiosInstance = axios.create({
  baseURL: serviceURL,
  // baseURL: "https://omontech-server.uz/api/v1/",
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default axiosInstance;
