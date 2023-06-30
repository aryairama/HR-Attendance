import PropTypes from 'prop-types';
import style from './style.module.css';

const Button = ({ className, onClick, children, schema, size, ...props }) => {
  return (
    <button className={`w-full ${className} ${style[schema]} ${style[size]}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired,
  schema: PropTypes.oneOf(['pills-purple', 'pills-green', 'pills-yellow']).isRequired,
  size: PropTypes.oneOf(['small']),
};

Button.defaultProps = {
  className: '',
  schema: '',
  size: '',
};
export default Button;
