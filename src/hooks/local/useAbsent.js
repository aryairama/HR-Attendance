import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useConvertMimeType } from '../global';

const useAbsent = () => {
  const { base64OrBlobToFiles, process_image } = useConvertMimeType();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [latLong, setLatLong] = useState({ lat: 0, long: 0 });
  const showToastGeolocation = (tipe) => {
    toast.warn(`Izinkan akses ${tipe} untuk melanjutkan absensi`, {
      onClose: () => {
        navigate('/dashboard', { replace: true });
      },
    });
  };
  const checkPermission = async () => {
    navigator.geolocation.watchPosition(
      function (position) {
        setLatLong({ lat: position.coords.latitude, long: position.coords.longitude });
      },
      function () {
        showToastGeolocation('lokasi');
      }
    );
    const camera = await navigator.permissions.query({ name: 'camera' });
    if (camera.state !== 'granted' && camera.state !== 'prompt') {
      showToastGeolocation('kamera selfie');
    }
  };

  const submitAbsent = async (getScreenshot) => {
    const base64Image = getScreenshot();
    let file = base64OrBlobToFiles(base64Image, new Date().getTime() + '.jpg', 'image/jpg', 'base64');
    file = await process_image(file, 0.5, 'jpg');
    console.log(file, latLong);
  };
  useEffect(() => {
    checkPermission();
    let timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  });
  return { time, setTime, latLong, setLatLong, submitAbsent };
};

export default useAbsent;
