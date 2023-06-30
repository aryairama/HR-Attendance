import PropTypes from 'prop-types';
import style from './style.module.css';
import usePagination from './usePagination';

const Index = ({ totalData, pageSize, currentPage, numberOfButtons, setPage }) => {
  const { pagination } = usePagination({ totalData, pageSize, currentPage, numberOfButtons });
  return (
    <ul className={style['pagination']}>
      <li
        className={`${(pagination[0] === currentPage || totalData === 0) && style['disabled']} ${style['next-prev']}`}
        onClick={currentPage - 1 < 1 || totalData === 0 ? null : () => setPage(currentPage - 1)}
      >
        Previous
      </li>
      {pagination.map((page, index) => (
        <li key={index} className={`${currentPage === page && style['active']}`} onClick={() => setPage(page)}>
          {page}
        </li>
      ))}
      <li
        className={`${(pagination.reverse()[0] === currentPage || totalData === 0) && style['disabled']} ${
          style['next-prev']
        }`}
        onClick={currentPage + 1 > pagination.length || totalData === 0 ? null : () => setPage(currentPage + 1)}
      >
        Next
      </li>
    </ul>
  );
};

Index.propTypes = {
  totalData: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfButtons: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Index;
