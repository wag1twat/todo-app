import axios from "axios";
import { Core } from "../core";

const axiosInstance = axios.create({
    baseURL: Core.env().API
})

axiosInstance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export { axiosInstance }