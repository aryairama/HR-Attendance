import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { actionGetProducts } from '../../redux/action/dumyApiAction';
import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { Formik, Form } from 'formik';
import { useHandlerFile } from '../global';

const usePermit = () => {
  const { handlerFile } = useHandlerFile();
  const [listPermit, setListPermit] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    start_date: '',
    end_date: '',
    permit_type_id: '2',
    description: '',
    file: '',
    name: 'Arya Irama Wahono',
  };
  const [formPermit, setFormPermit] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
  };
  useEffect(() => {
    (async () => {
      setListPermit({ type: 'FETCH_DATA' });
      const { data, pagination } = await actionGetProducts();
      setListPermit({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, []);
  return {
    listPermit,
    setListPermit,
    modalAddForm,
    setModalAddForm,
    handlerCloseModal,
    formPermit,
    setFormPermit,
    Form,
    Formik,
    handlerFile,
  };
};

export default usePermit;
