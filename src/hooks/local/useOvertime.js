import { useState, useReducer, useEffect } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { actionGetProducts } from '../../redux/action/dumyApiAction';
import { Formik, Form } from 'formik';
import { inputOnlyNumber } from '../../utils/formater';

const useOvertime = () => {
  const [listOvertime, setLisOvertime] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    id: '',
    start_date: '',
    end_date: '',
    start_time: '',
    description: '',
    end_time: '',
    name: 'Arya Irama Wahono',
  };
  const [formOvertime, setFormOvertime] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
  };
  const handlerEditForm = (id) => {
    console.log(id);
    setModalAddForm(true);
  };
  useEffect(() => {
    (async () => {
      setLisOvertime({ type: 'FETCH_DATA' });
      const { data, pagination } = await actionGetProducts();
      setLisOvertime({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, []);
  return {
    listOvertime,
    setLisOvertime,
    modalAddForm,
    setModalAddForm,
    handlerCloseModal,
    formOvertime,
    setFormOvertime,
    Form,
    Formik,
    inputOnlyNumber,
    handlerEditForm,
  };
};

export default useOvertime;
