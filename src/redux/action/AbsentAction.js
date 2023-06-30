import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const absent = async (values) => {
  store.dispatch(SHOW_LOADER());
  try {
    const formData = new FormData();
    formData.append('photo', values.file);
    formData.append('attendance_type', 'clock_in');
    formData.append('longitude', values.long);
    formData.append('latitude', values.lat);
    const { data } = await (await axios().post('/attendances', formData)).data;
    console.log(data);
  } catch (error) {
    toast.error('Terjadi kesalahan, silahkan coba lagi!');
  }
  store.dispatch(HIDDEN_LOADER());
};
