import env from './env';
import axios from 'axios';

const customAxios = () => {
  const accessToken = localStorage.getItem('access_token');
  const restApiBackend = axios.create({
    baseURL: env().BACKEND_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  restApiBackend.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        localStorage.removeItem('access_token');
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  );
  return restApiBackend;
};

export const customAxiosWithoutInterceptors = () => {
  const accessToken = localStorage.getItem('access_token');
  const restApiBackend = axios.create({
    baseURL: env().BACKEND_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return restApiBackend;
};

export default customAxios;
