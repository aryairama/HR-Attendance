import { userDutiesAreas, userDutiesAreasFilter } from '../../redux/action/UserDuties';
import { useEffect, useState, useReducer } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

const useUserDuties = () => {
  const [dutiesAreas, setDutiesAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState();
  const columnHelper = createColumnHelper();
  const [listuserDutiesAreasFilter, setListuserDutiesAreasFilter] = useReducer(datatableReducer, initialDatatable);
  const columnsListuserDutiesAreasFilter = [
    columnHelper.accessor('duty_name', {
      id: 'duty_name',
      header: 'Pekerjaan',
      enableSorting: false,
    }),
  ];
  const tableListuserDutiesAreasFilter = useReactTable({
    data: listuserDutiesAreasFilter.data || [],
    columns: columnsListuserDutiesAreasFilter,
    getCoreRowModel: getCoreRowModel(), // model Row table
    getSortedRowModel: getSortedRowModel(), // model Sorting Table
    getFilteredRowModel: getFilteredRowModel(), // model filter data
    manualSorting: true,
    getRowId: (row) => row.id,
  });
  useEffect(() => {
    (async () => {
      const areas = await userDutiesAreas();
      setDutiesAreas(areas);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (selectedArea !== undefined) {
        setListuserDutiesAreasFilter({ type: 'FETCH_DATA' });
        const data = await userDutiesAreasFilter(selectedArea);
        setListuserDutiesAreasFilter({ type: 'STORE_DATA', payload: { data, pagination: {} } });
      }
    })();
  }, [selectedArea]);
  return { dutiesAreas, setDutiesAreas, selectedArea, setSelectedArea, tableListuserDutiesAreasFilter };
};

export default useUserDuties;
