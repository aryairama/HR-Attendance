/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';

const DatatableCheckbox = ({ indeterminate, className = '', ...rest }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ''} {...rest} />;
};

DatatableCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
};

export default DatatableCheckbox;
