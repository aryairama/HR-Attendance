/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useReducer, useEffect, useRef } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { Formik, Form } from 'formik';
import { inputOnlyNumber } from '../../utils/formater';
import { leave, postLeave } from '../../redux/action/LeaveAction';
import { useOutletContext } from 'react-router-dom';

const useLeave = () => {
  const [authData] = useOutletContext();
  const refFormik = useRef(null);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({ page: 1 });
  const [listLeave, setListLeave] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    id: '',
    start_date: '',
    end_date: '',
    entry_date: '',
    description: '',
    // leave_count: '',
    name: `${authData.first_name} ${authData.last_name}`,
  };
  const [formLeave, setFormLeave] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
    setFormLeave(initialFormPermit);
    refFormik.current?.resetForm(initialFormPermit);
  };
  const handlerEditForm = (id) => {
    const data = listLeave?.data?.filter((value) => value.id === id);
    setModalAddForm(true);
    setFormLeave(data[0]);
  };
  const handlerSubmit = (values, formik) => {
    postLeave(values, formik, setReload, handlerCloseModal);
  };
  useEffect(() => {
    (async () => {
      setListLeave({ type: 'FETCH_DATA' });
      const { data, pagination } = await leave(filter.page);
      setListLeave({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, [JSON.stringify(filter), reload]);
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
    setFilter,
    filter,
    refFormik,
    handlerSubmit,
  };
};

export default useLeave;
