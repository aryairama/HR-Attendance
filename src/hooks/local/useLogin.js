/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { detect } from 'detect-browser';
import { toast } from 'react-toastify';

const useLogin = () => {
  const [formLogin] = useState({
    email: '',
    password: '',
  });
  const list = ['edge', 'firefox', 'edge-chromium', 'edge-ios', 'chrome'];
  useEffect(() => {
    const browser = detect();
    if (!list.includes(browser.name)) {
      toast.warn('Browser anda tidak mendukung, silahkan gunakan browser seperti chrome ,edge, dan firefox!');
    }
  }, []);
  return { Form, Formik, formLogin };
};

export default useLogin;
