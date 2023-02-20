import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/'
})

// axiosInstance.interceptors.request.use(function (config) {
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });

// axiosInstance.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     return Promise.reject(error);
//   });

export { axiosInstance }