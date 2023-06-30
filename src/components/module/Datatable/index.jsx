/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import style from './style.module.css';
import { flexRender } from '@tanstack/react-table';
import { PaginationDatatable } from '../../base';

const Datatable = ({ table, classNameContainer, totalData }) => {
  useEffect(() => {
    table.setPageIndex(0);
  }, [table.getState().globalFilter]);
  return (
    <>
      <div className={`w-full overflow-y-auto ${classNameContainer}`}>
        <table className={style['datatable']}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={style['datatable-thead-tr']} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={style['datatable-th']} key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-2'
                              : 'flex',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {/* {header.column.getCanSort() && (
                        <span className="flex-shrink-0">
                          {header.column.getIsSorted() === 'asc' || header.column.getIsSorted() === 'desc' ? (
                            <>
                              {header.column.getIsSorted() === 'asc' && (
                                <img width="8px" height="8px" src={iconSortUp} alt="icon-sort-up" />
                              )}
                              {header.column.getIsSorted() === 'desc' && (
                                <img width="8px" height="8px" src={iconSortDown} alt="icon-sort-down" />
                              )}
                            </>
                          ) : (
                            <img width="8px" height="5px" src={iconNoSort} alt="icon-no-sort" />
                          )}
                        </span>
                      )} */}
                        </div>
                        {/* {header.column.getCanFilter() && (
                        <input
                          placeholder={`Search ${header.column.columnDef.header}`}
                          value={header.column.getFilterValue() || ''}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          type="text"
                          className="dsy-input dsy-input-bordered dsy-input-xs text-gray-900 placeholder:text-gray-900 bg-white border-gray-900 mt-1"
                        />
                      )} */}
                      </React.Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className={style['datatable-tbody-tr']} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={style['datatable-td']} key={cell.id}>
                    <div className={style['datatable-td-content']}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr className={style['datatable-thead-tr']} key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th className={style['datatable-th']} key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
      </div>
      <div className="my-1 flex justify-end w-full">
        <PaginationDatatable
          totalData={totalData || 0}
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          numberOfButtons={5}
          setPage={table.setPageIndex}
        />
      </div>
    </>
  );
};

Datatable.propTypes = {
  table: PropTypes.object.isRequired,
  classNameContainer: PropTypes.string,
  totalData: PropTypes.number.isRequired,
  pagination: PropTypes.bool,
};

Datatable.defaultProps = {
  classNameContainer: '',
  pagination: true,
  totalData: 0,
};
export default Datatable;
