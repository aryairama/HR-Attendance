import { Form, Formik } from 'formik';
import { useState } from 'react';

const useLogin = () => {
  const [formLogin] = useState({
    email: '',
    password: '',
  });
  return { Form, Formik, formLogin };
};

export default useLogin;
