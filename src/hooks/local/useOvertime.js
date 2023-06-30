/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useReducer, useEffect } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { Formik, Form } from 'formik';
import { inputOnlyNumber } from '../../utils/formater';
import { overtime, postOvertime } from '../../redux/action/OvertimeAction';
import { useOutletContext } from 'react-router-dom';
import { useRef } from 'react';

const useOvertime = () => {
  const [authData] = useOutletContext();
  const refFormik = useRef(null);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({ page: 1 });
  const [listOvertime, setLisOvertime] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    id: '',
    start_date: '',
    end_date: '',
    start_time: '',
    description: '',
    end_time: '',
    name: `${authData.first_name} ${authData.last_name}`,
  };
  const [formOvertime, setFormOvertime] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
    setFormOvertime(initialFormPermit);
    refFormik.current?.resetForm(initialFormPermit);
  };
  const handlerEditForm = (id) => {
    const data = listOvertime?.data?.filter((value) => value.id === id);
    setModalAddForm(true);
    setFormOvertime(data[0]);
  };
  const handlerSubmit = (values, formik) => {
    postOvertime(values, formik, setReload, handlerCloseModal);
  };
  useEffect(() => {
    (async () => {
      setLisOvertime({ type: 'FETCH_DATA' });
      const { data, pagination } = await overtime(filter.page);
      setLisOvertime({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, [JSON.stringify(filter), reload]);
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
    filter,
    setFilter,
    refFormik,
    setReload,
    handlerSubmit,
  };
};

export default useOvertime;
