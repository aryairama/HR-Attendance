/* eslint-disable no-unused-vars */
import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const userDutiesAreas = async () => {
  store.dispatch(SHOW_LOADER());
  try {
    const { data } = await (await axios().get(`/user-duties/areas`)).data;
    store.dispatch(HIDDEN_LOADER());
    return data;
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
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

export const userDutiesChecklist = async (ids = [], file, setReload) => {
  store.dispatch(SHOW_LOADER());
  try {
    const batchFetch = [];
    ids.forEach((value) => {
      const formData = new FormData();
      formData.append('user_duty_id', value);
      batchFetch.push(axios().post(`/user-duties/checklist`, formData));
    });
    await Promise.all(batchFetch);
    setReload((oldVal) => !oldVal);
    toast.success('Berhasil melakukan pekerjaan');
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data?.data?.message || error.response?.data?.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
};
