/* eslint-disable react-hooks/exhaustive-deps */
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import { useReducer, useEffect } from 'react';
import { actionGetProducts } from '../../redux/action/dumyApiAction';

const useHome = () => {
  const columnHelper = createColumnHelper();
  const [listAttendance, setListAttendance] = useReducer(datatableReducer, initialDatatable);
  const columnsListAttendance = [
    columnHelper.accessor('name', {
      id: 'date',
      header: 'Tanggal',
      enableSorting: false,
    }),
    columnHelper.accessor('price', {
      id: 'clock_in',
      header: 'Jam Masuk',
      enableSorting: false,
    }),
    columnHelper.accessor('price', {
      id: 'home_time',
      header: 'Jam Pulang',
      enableSorting: false,
    }),
  ];
  const tableListAttendance = useReactTable({
    data: listAttendance.data || [],
    columns: columnsListAttendance,
    getCoreRowModel: getCoreRowModel(), // model Row table
    getSortedRowModel: getSortedRowModel(), // model Sorting Table
    getFilteredRowModel: getFilteredRowModel(), // model filter data
    getPaginationRowModel: getPaginationRowModel(), // model pagination
    manualPagination: true,
    manualSorting: true,
    pageCount: listAttendance?.pagination?.pages || 0,
    getRowId: (row) => row.product_id,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
  });
  useEffect(() => {
    (async () => {
      const {
        globalFilter,
        pagination: { pageIndex, pageSize },
        sorting,
      } = tableListAttendance.getState();
      setListAttendance({ type: 'FETCH_DATA' });
      const { data, pagination } = await actionGetProducts(
        globalFilter || '',
        pageIndex + 1,
        pageSize,
        sorting[0]?.id || 'id',
        sorting[0]?.desc === true ? 'asc' : 'desc'
      );
      setListAttendance({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, [JSON.stringify(tableListAttendance.getState())]);
  return { listAttendance, setListAttendance, tableListAttendance };
};

export default useHome;
