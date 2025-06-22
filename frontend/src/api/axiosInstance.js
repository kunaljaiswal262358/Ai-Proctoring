import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
})

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("auth-token");
    if(token) config.headers['x-auth-token'] = token;
    return config
},(error) => Promise.reject(error));

export default axiosInstance;