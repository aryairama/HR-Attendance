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
  return restApiBackend;
};

export default customAxios;
