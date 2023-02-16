import axios from "axios";
import { DateTime } from "luxon";
import {  EnvKeys } from "../managers";

const axiosInstance = axios.create({
    baseURL: process.env[EnvKeys.REACT_APP_API]
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