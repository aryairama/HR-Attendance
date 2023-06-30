import PropTypes from 'prop-types';
import style from './style.module.css';

const ModalDialog = (props) => {
  return (
    <div
      onClick={props.closeModal}
      id={props.modalId}
      className={`${style['modal']} ${props.showModal ? style['modal-show'] : ''} ${props.classNameModalContainer}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={`${style['modal-content']} ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};

ModalDialog.propTypes = {
  modalId: PropTypes.string.isRequired,
  classNameModalContainer: PropTypes.string,
  className: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  children: PropTypes.node,
};

export default ModalDialog;
