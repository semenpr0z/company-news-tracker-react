import axios from 'axios';
import Cookies from 'js-cookie';

const http = axios.create({
    baseURL: 'https://gateway.scan-interfax.ru/',
    headers: {
        'Content-Type': 'application/json',
    }
})

http.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

export default http