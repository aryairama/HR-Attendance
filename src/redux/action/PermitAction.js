/* eslint-disable no-unused-vars */
import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const permit = async (page = 1) => {
  try {
    const { data, total } = await (await axios().get(`/permits?page=${page}`)).data;
    return { data, pagination: { total } };
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
};

export const postPermit = async (values, formik, setReload, handlerCloseModal) => {
  store.dispatch(SHOW_LOADER());
  try {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    await axios().post('/permits', formData);
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
