/* eslint-disable no-unused-vars */
import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios, { customAxiosWithoutInterceptors } from '../../config/axios';

export const login = async (values, formik, navigate) => {
  store.dispatch(SHOW_LOADER());
  try {
    const { data } = await (await axios().post('/auth/login', { ...values })).data;
    localStorage.setItem('access_token', data.access_token);
    navigate('/dashboard');
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
};

export const authLogin = async () => {
  try {
    const { data } = await (await customAxiosWithoutInterceptors().get('/auth/me')).data;
    window.location.replace('/dashboard');
    return data;
  } catch (error) {
    localStorage.removeItem('access_token');
    return {};
  }
};

export const authDashbaord = async () => {
  try {
    const { data } = await (await customAxiosWithoutInterceptors().get('/auth/me')).data;
    return data;
  } catch (error) {
    localStorage.removeItem('access_token');
    window.location.replace('/login');
    return {};
  }
};
