import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { actionGetProducts } from '../../redux/action/dumyApiAction';
import { useEffect } from 'react';
import { useReducer } from 'react';

const usePermit = () => {
  const [listPermit, setListPermit] = useReducer(datatableReducer, initialDatatable);
  useEffect(() => {
    (async () => {
      setListPermit({ type: 'FETCH_DATA' });
      const { data, pagination } = await actionGetProducts();
      setListPermit({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, []);
  return { listPermit, setListPermit };
};

export default usePermit;
