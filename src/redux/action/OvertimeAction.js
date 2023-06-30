/* eslint-disable no-unused-vars */
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import store from '../store';

export const overtime = async (page = 1) => {
  try {
    const { data, total } = await (await axios().get(`/overtimes?page=${page}`)).data;
    return { data, pagination: { total } };
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};

export const postOvertime = async (values, formik, setReload, handlerCloseModal) => {
  store.dispatch(SHOW_LOADER());
  try {
    await axios().post('/overtimes', values);
    setReload((oldVal) => !oldVal);
    handlerCloseModal();
    toast.success('Berhasil mengajukan lembur.');
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
};
