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
import { useReducer, useEffect, useState } from 'react';
import { history, historySummary } from '../../redux/action/HistoryAction';

const useHistory = () => {
  const columnHelper = createColumnHelper();
  const [listAbsentHistory, setListAbsentHistory] = useReducer(datatableReducer, initialDatatable);
  const [absentSummary, setAbsentSummary] = useState({
    late: 0,
    attend: 0,
    unattend: 0,
    sick: 0,
    permit: 0,
    leave: 0,
  });
  const columnsListAbsentHistory = [
    columnHelper.accessor('date_at', {
      id: 'date_at',
      header: 'Tanggal',
      enableSorting: false,
    }),
    columnHelper.accessor('clock_in_at', {
      id: 'clock_in_at',
      header: 'Jam Masuk',
      enableSorting: false,
      cell: ({ row }) => (
        <>
          {row.original?.clock_in_at !== null && row.original?.clock_in_at !== undefined
            ? row.original?.clock_in_at
            : '-'}
        </>
      ),
    }),
    columnHelper.accessor('clock_out_at', {
      id: 'clock_out_at',
      header: 'Jam Pulang',
      enableSorting: false,
      cell: ({ row }) => (
        <>
          {row.original?.clock_out_at !== null && row.original?.clock_out_at !== undefined
            ? row.original?.clock_out_at
            : '-'}
        </>
      ),
    }),
  ];
  const tableListAbsentHistory = useReactTable({
    data: listAbsentHistory.data || [],
    columns: columnsListAbsentHistory,
    getCoreRowModel: getCoreRowModel(), // model Row table
    getSortedRowModel: getSortedRowModel(), // model Sorting Table
    getFilteredRowModel: getFilteredRowModel(), // model filter data
    getPaginationRowModel: getPaginationRowModel(), // model pagination
    manualPagination: true,
    manualSorting: true,
    pageCount: listAbsentHistory?.pagination?.total || 0,
    getRowId: (row) => row.id,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
  });
  useEffect(() => {
    (async () => {
      setListAbsentHistory({ type: 'FETCH_DATA' });
      const { data, pagination } = await history(
        tableListAbsentHistory.getState().pagination.pageIndex + 1,
        tableListAbsentHistory.getState().pagination.pageSize
      );
      setListAbsentHistory({ type: 'STORE_DATA', payload: { data, pagination } });
    })();
  }, [JSON.stringify(tableListAbsentHistory.getState())]);
  useEffect(() => {
    (async () => {
      const data = await historySummary();
      setAbsentSummary((oldVal) => ({ ...oldVal, ...data }));
    })();
  }, []);
  return { listAbsentHistory, setListAbsentHistory, tableListAbsentHistory, absentSummary };
};

export default useHistory;
