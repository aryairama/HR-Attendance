import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useConvertMimeType } from './';

const useHandlerFile = () => {
  const { process_image, convertPngToJpg } = useConvertMimeType();
  const dispatch = useDispatch();
  const mimeImg = ['image/jpeg', 'image/jpg', 'image/png'];
  const handlerFile = async (e, formik, imgResize = false, forceImgToJpg = false, maxFile) => {
    try {
      formik.setFieldTouched(e.target.name, true, false);
      let file = e.target.files[0];
      if (imgResize) {
        if (file instanceof File && mimeImg.includes(file.type)) {
          dispatch({ type: 'SHOW_LOADER' });
          file = await process_image(e.target.files[0], maxFile, 'jpg');
        }
      }
      if (forceImgToJpg) {
        file = await convertPngToJpg(file);
      }
      formik.setFieldValue(e.target.name, file);
      if (imgResize && mimeImg.includes(file.type)) dispatch({ type: 'HIDDEN_LOADER' });
    } catch (error) {
      toast.error('Coba sebentar lagi ya, kami sedang memperbaikinya.');
    }
  };
  return { handlerFile };
};

export default useHandlerFile;
