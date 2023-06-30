/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { detect } from 'detect-browser';
import { toast } from 'react-toastify';
import { login } from '../../redux/action/AuthAction';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const [formLogin] = useState({
    identity: '',
    password: '',
  });
  const handlerSubmit = async (values, formik) => {
    login(values, formik, navigate);
  };
  const list = ['edge', 'firefox', 'edge-chromium', 'edge-ios', 'chrome'];
  useEffect(() => {
    const browser = detect();
    if (!list.includes(browser.name)) {
      toast.warn('Browser anda tidak mendukung, silahkan gunakan browser seperti chrome ,edge, dan firefox!');
    }
  }, []);
  return { Form, Formik, formLogin, handlerSubmit };
};

export default useLogin;
