import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://fabromall-server.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("tok")}`,
  },
});
AxiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("tok");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
