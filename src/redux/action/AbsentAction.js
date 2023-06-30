import store from '../store';
import { HIDDEN_LOADER, SHOW_LOADER } from '../reducers/loaderReducer';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

export const absent = async (values) => {
  store.dispatch(SHOW_LOADER());
  try {
    const formData = new FormData();
    formData.append('photo', values.file);
    formData.append('attendance_type', values.attendance);
    formData.append('longitude', values.long);
    formData.append('latitude', values.lat);
    await (
      await axios().post('/attendances', formData)
    ).data;
    toast.success('Berhasil melakukan absen');
  } catch (error) {
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.warn(error.response.data.data.message);
    } else {
      toast.error('Terjadi kesalahan, silahkan coba lagi!');
    }
  }
  store.dispatch(HIDDEN_LOADER());
};
