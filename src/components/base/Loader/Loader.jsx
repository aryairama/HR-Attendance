import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import iconLoader from '../../../assets/icons/logo.jpg';
const Loader = (props) => {
  const { show } = useSelector((state) => state.loader);
  return (
    <div
      className={`${
        props.show ? (props.show === true ? 'flex' : 'hidden') : show ? 'flex' : 'hidden'
      } bg-white fixed z-[999999] top-0 right-0 left-0 bottom-0 justify-center items-center w-full h-full`}
    >
      <img className="h-10 w-20" src={iconLoader} alt="icon-loader" />
    </div>
  );
};

Loader.propTypes = {
  show: PropTypes.bool,
};

export default Loader;
