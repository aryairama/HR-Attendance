/* eslint-disable no-unused-vars */
import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const userDutiesAreas = async () => {
  try {
    const { data } = await (await axios().get(`/user-duties/areas`)).data;
    return data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};

export const userDutiesAreasFilter = async (id) => {
  try {
    const { data } = await (await axios().get(`/user-duties/areas/${id}`)).data;
    return data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};
