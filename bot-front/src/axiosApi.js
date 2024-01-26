import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://207.154.241.72:8000',
});

export default axiosApi;
