import { userDutiesAreas, userDutiesAreasFilter, userDutiesChecklist } from '../../redux/action/UserDuties';
import { useEffect, useState, useReducer } from 'react';
import { datatableReducer, initialDatatable } from '../../redux/reducers/datatableReducer';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { DatatableCheckbox } from '../../components/module';

const useUserDuties = () => {
  const [reload, setReload] = useState(false);
  const [dutiesAreas, setDutiesAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState();
  const [document, setDocument] = useState([]);
  const [currentDocument, setCurrentDocument] = useState([]);
  const columnHelper = createColumnHelper();
  const [listuserDutiesAreasFilter, setListuserDutiesAreasFilter] = useReducer(datatableReducer, initialDatatable);
  const columnsListuserDutiesAreasFilter = [
    columnHelper.accessor('select', {
      id: 'select',
      header: ({ table }) => (
        <DatatableCheckbox
          className="ml-1"
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          {row.original.status === 'unexecuted' ? (
            <DatatableCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ) : (
            <input type="checkbox" className="checked:bg-gray-500" checked={true} disabled={true} />
          )}
        </div>
      ),
      enableSorting: false,
    }),
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
    enableRowSelection: (row) => row.original.status === 'unexecuted',
  });
  const handlerSubmit = () => {
    const ids = [];
    Object.keys(tableListuserDutiesAreasFilter.getState().rowSelection).forEach((key) => {
      ids.push(key);
    });
    userDutiesChecklist(
      ids,
      document,
      setReload,
      selectedArea,
      setDocument,
      tableListuserDutiesAreasFilter.setRowSelection({})
    );
  };
  const handlerRemoveFile = (index) => {
    const temporaryDocument = [...document];
    temporaryDocument.splice(index, 1);
    setDocument(temporaryDocument);
  };
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
        setListuserDutiesAreasFilter({ type: 'STORE_DATA', payload: { data: data[0].user_duties, pagination: {} } });
        setCurrentDocument(data[0].documents);
      }
    })();
  }, [selectedArea, reload]);
  return {
    dutiesAreas,
    setDutiesAreas,
    selectedArea,
    setSelectedArea,
    tableListuserDutiesAreasFilter,
    handlerSubmit,
    setDocument,
    document,
    currentDocument,
    handlerRemoveFile,
  };
};

export default useUserDuties;
