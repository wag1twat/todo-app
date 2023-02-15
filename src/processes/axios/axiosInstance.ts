import axios from "axios";
import {  EnvKeys } from "../managers";

const axiosInstance = axios.create({
    baseURL: process.env[EnvKeys.REACT_APP_API]
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log('interceptors', error)
    return Promise.reject(error);
  });

export { axiosInstance }