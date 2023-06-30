/* eslint-disable no-unused-vars */
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import store from '../store';

export const leave = async (page = 1) => {
  try {
    const { data, total } = await (await axios().get(`/permits/leave?page=${page}`)).data;
    return { data, pagination: { total } };
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};

export const postLeave = async (values, formik, setReload, handlerCloseModal) => {
  store.dispatch(SHOW_LOADER());
  try {
    await axios().post('/permits/leave', values);
    setReload((oldVal) => !oldVal);
    handlerCloseModal();
    toast.success('Berhasil mengajukan cuti.');
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
};
