import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const history = async (page = 1, limit = 5) => {
  try {
    const { data, total } = await (await axios().get(`/attendances?page=${page}&limit=${limit}`)).data;
    return { data, pagination: { total } };
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};

export const historySummary = async () => {
  try {
    let { data } = await (await axios().get(`/attendances/summary`)).data;
    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === 'null') {
        data[key] = 0;
      }
    });
    return data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};
