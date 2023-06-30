/* eslint-disable react-hooks/exhaustive-deps */
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { useEffect, useRef, useState } from 'react';
import { useReducer } from 'react';
import { Formik, Form } from 'formik';
import { useHandlerFile } from '../global';
import { permit, postPermit } from '../../redux/action/PermitAction';
import { useOutletContext } from 'react-router-dom';

const usePermit = () => {
  const [authData] = useOutletContext();
  const refFormik = useRef(null);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({ page: 1 });
  const { handlerFile } = useHandlerFile();
  const [listPermit, setListPermit] = useReducer(datatableReducer, initialDatatable);
  const [modalAddForm, setModalAddForm] = useState(false);
  const initialFormPermit = {
    start_date: '',
    end_date: '',
    permit_type_id: '2',
    description: '',
    document: '',
    name: `${authData.first_name} ${authData.last_name}`,
  };
  const [formPermit, setFormPermit] = useState(initialFormPermit);
  const handlerCloseModal = () => {
    setModalAddForm(false);
    refFormik.current?.resetForm(initialFormPermit);
  };
  const handlerSubmit = (values, formik) => {
    postPermit(values, formik, setReload, handlerCloseModal);
  };
  useEffect(() => {
    (async () => {
      setListPermit({ type: 'FETCH_DATA' });
      const { data, pagination } = await permit(filter.page);
      setListPermit({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, [JSON.stringify(filter), reload]);
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
    filter,
    setFilter,
    refFormik,
    handlerSubmit,
  };
};

export default usePermit;
