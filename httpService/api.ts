import axios from "axios";

export const BaseURL = "http://cms.chtoma.com/api";

// axios instance
export const axiosInstance = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // add token if it is not "login" request
    if (!config.url?.includes("login")) {
      const token = JSON.parse(
        localStorage.getItem("cms-user") as string
      ).token;

      return {
        ...config,
        headers: { ...config.headers,Authorization: `Bearer ${token}` },
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
