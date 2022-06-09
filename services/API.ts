import axios, { AxiosInstance } from "axios";
import https from 'http';
// const config = require("../config");

const baseUrl = process.env.NEXT_REACT_APP_API_URL;
const token = process.env.NEXT_TOKEN_FB;

export let API: AxiosInstance = undefined!;

console.log(baseUrl)

API = axios.create({
  baseURL:  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  
  (config) => {
    console.log({ baseUrl, token },'config')
    // config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers != null
      ? (config.headers["Authorization"] = `Bearer ${token}`)
      : null;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
