import axios from 'axios';
import {apiUrl} from "./config";

const axiosApi = axios.create({
    baseURL: 'http://64.226.116.197:8000',
});

export default axiosApi;
