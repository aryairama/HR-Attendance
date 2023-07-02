/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
import iconAddFile from '../../../assets/icons/icon-evidance-primary-30.svg';
import iconAddFileDisabled from '../../../assets/icons/icon-evidance-neutral-40.svg';
import iconUploadFile from '../../../assets/icons/icon-upload-primary-30.svg';
import iconUploadFileDisabled from '../../../assets/icons/icon-upload-neutral-40.svg';
import iconClose from '../../../assets/icons/icon-close-primary-30.svg';

const MultipleInputFile = ({
  validation,
  disabled,
  classNameContainer,
  textButtonUpload,
  hiddenErrorMessage,
  accept,
  children,
  id,
  touched,
  error,
  typeButton,
  ...props
}) => {
  return (
    <div className={`${style['multiple-input-file-container']} ${classNameContainer}`}>
      <input multiple id={id} value="" type="file" accept={accept} className="hidden" {...props} />
      {children}
      {typeButton === '1' && (
        <button
          className={style['multiple-input-file-button']}
          disabled={disabled}
          type="button"
          onClick={(e) => document.getElementById(id).click()}
        >
          <img
            src={disabled ? iconAddFileDisabled : iconAddFile}
            className={style['multiple-input-file-icon']}
            alt="icon-upload-file"
          />
          {textButtonUpload}
        </button>
      )}
      {typeButton === '2' && (
        <button
          className={style['multiple-input-file-button']}
          disabled={disabled}
          type="button"
          onClick={(e) => document.getElementById(id).click()}
        >
          <img
            src={disabled ? iconUploadFileDisabled : iconUploadFile}
            className={style['multiple-input-file-icon']}
            alt="icon-upload-file"
          />
          {textButtonUpload}
        </button>
      )}
      {validation && touched && error && !hiddenErrorMessage && (
        <div className={style['multiple-input-file-label-error']}>{error}</div>
      )}
    </div>
  );
};

MultipleInputFile.File = ({
  fileName,
  functionRemoveFile,
  functionClickFileName,
  iconFile,
  disabled,
  customIconFile,
  ...props
}) => {
  return (
    <div onClick={functionClickFileName} className={style['multiple-input-file-container-filename']}>
      {iconFile && <div className={style['multiple-input-filename-icon']}></div>}
      {customIconFile}
      <div className={style['multiple-input-filename']}>{fileName}</div>
      {!disabled && (
        <img
          src={iconClose}
          onClick={() => {
            if (typeof functionRemoveFile === 'function') {
              functionRemoveFile();
            }
          }}
          className={style['multiple-input-icon-remove-file']}
          alt="icon-remove-file"
        />
      )}
    </div>
  );
};

MultipleInputFile.propTypes = {
  validation: PropTypes.bool.isRequired,
  classNameContainer: PropTypes.string,
  disabled: PropTypes.bool,
  textButtonUpload: PropTypes.string.isRequired,
  hiddenErrorMessage: PropTypes.bool,
  id: PropTypes.string.isRequired,
  typeButton: PropTypes.string,
};

MultipleInputFile.defaultProps = {
  validation: true,
  classNameContainer: '',
  disabled: false,
  textButtonUpload: '',
  hiddenErrorMessage: false,
  typeButton: '1',
};

MultipleInputFile.File.propTypes = {
  fileName: PropTypes.string.isRequired,
  functionRemoveFile: PropTypes.func,
  iconFile: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  functionClickFileName: PropTypes.func,
};

MultipleInputFile.File.defaultProps = {
  fileName: '',
  iconFile: false,
  disabled: false,
};

export default MultipleInputFile;
