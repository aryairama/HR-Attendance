/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useConvertMimeType } from '../global';
import { absent } from '../../redux/action/AbsentAction';

const useAbsent = () => {
  const [authData] = useOutletContext();
  const { base64OrBlobToFiles, process_image } = useConvertMimeType();
  const navigate = useNavigate();
  const [accessAbsent, setAccessAbsent] = useState({
    camera: false,
    location: false,
    radius: false,
  });
  const [time, setTime] = useState(new Date());
  const [latLong, setLatLong] = useState({ lat: 0, long: 0 });
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  const showToastGeolocation = (tipe) => {
    toast.warn(`Izinkan akses ${tipe} untuk melanjutkan absensi`, {
      onClose: () => {
        // navigate('/dashboard', { replace: true });
      },
    });
  };
  const checkPermission = async () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatLong({ lat: position.coords.latitude, long: position.coords.longitude });
        setAccessAbsent((oldVal) => ({ ...oldVal, location: true }));
      },
      function () {
        showToastGeolocation('lokasi');
      }
    );
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
        },
      })
      .then(() => {
        setAccessAbsent((oldVal) => ({ ...oldVal, camera: true }));
      })
      .catch(() => {
        showToastGeolocation('kamera selfie');
      });
  };

  const submitAbsent = async (getScreenshot, attendance) => {
    const base64Image = getScreenshot();
    let file = base64OrBlobToFiles(base64Image, new Date().getTime() + '.jpg', 'image/jpg', 'base64');
    file = await process_image(file, 0.5, 'jpg');
    absent({ file, ...latLong, attendance }, navigate);
  };
  useEffect(() => {
    checkPermission();
    let timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  useEffect(() => {
    if (
      calculateDistance(authData.assignment.latitude, authData.assignment.longitude, latLong.lat, latLong.long) *
        1000 <=
      authData.assignment.radius
    ) {
      setAccessAbsent((oldVal) => ({ ...oldVal, radius: true }));
    }
  }, [latLong]);
  return { time, setTime, latLong, setLatLong, submitAbsent, accessAbsent, authData };
};

export default useAbsent;
