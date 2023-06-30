import { useState, useReducer, useEffect } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { actionGetProducts } from '../../redux/action/dumyApiAction';
import { Formik, Form } from 'formik';
import { inputOnlyNumber } from '../../utils/formater';

const useLeave = () => {
  const [listLeave, setListLeave] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    id: '',
    start_date: '',
    end_date: '',
    entry_date: '',
    description: '',
    leave_count: '',
    name: 'Arya Irama Wahono',
  };
  const [formLeave, setFormLeave] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
  };
  const handlerEditForm = (id) => {
    console.log(id);
    setModalAddForm(true);
  };
  useEffect(() => {
    (async () => {
      setListLeave({ type: 'FETCH_DATA' });
      const { data, pagination } = await actionGetProducts();
      setListLeave({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, []);
  return {
    listLeave,
    setListLeave,
    modalAddForm,
    setModalAddForm,
    handlerCloseModal,
    formLeave,
    setFormLeave,
    Form,
    Formik,
    inputOnlyNumber,
    handlerEditForm,
  };
};

export default useLeave;
