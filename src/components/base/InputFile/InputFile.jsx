/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';
import { useState } from 'react';
import style from './Input.module.css';
import { useField, useFormikContext } from 'formik';
import iconUpload from '../../../assets/icons/icon-upload.svg';
import iconDownload from '../../../assets/icons/icon-download.svg';
import iconClose from '../../../assets/icons/icon-close.svg';

const InputFile = ({
  classNameContainer,
  classNameLabelBox,
  validation,
  label,
  onClick,
  labelBox,
  textBtnFile,
  iconType,
  btnFileOnClick,
  classNameBoxFileName,
  classNameNamefile,
  // requiredLabel,
  ...props
}) => {
  const [field, meta] = validation ? useField(props) : [];
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [nameFile, setNameFile] = useState('');
  const handlerChange = (e) => {
    setFieldTouched(props.name, true, false);
    setFieldValue(props.name, e.target.files[0]);
    setNameFile(e.target.files[0].name);
  };
  return (
    <div className={`${style['input-container']} ${classNameContainer}`}>
      {label && (
        <label className={style['input-label']} htmlFor={props.id}>
          {label}
          {/* {requiredLabel ? <span className={style['input-label-required']}>*</span> : null} */}
        </label>
      )}
      <div className="flex w-full">
        <div
          className={`${style['box-file-name']} ${
            props?.disabled === true ? ' !bg-[#edf1f7] !text-[#b3b8c2]' : ''
          } ${classNameBoxFileName}`}
        >
          {labelBox && <div className={`${style['label-box']} ${classNameLabelBox}`}>{labelBox}</div>}
          <span className={classNameNamefile}>{props.namefile ? props.namefile : nameFile}</span>
          {iconType === 'upload' && (
            <img
              onClick={() =>
                validation
                  ? onClick
                    ? onClick()
                    : (setFieldValue(props.name, ''), setNameFile(''), setFieldTouched(props.name, true, false))
                  : onClick
                  ? onClick()
                  : null
              }
              className={style['clear-box-file-name']}
              src={iconClose}
              alt="icon-close"
            />
          )}
        </div>
        <label
          onClick={iconType === 'download' ? btnFileOnClick : null}
          className={style['btn-label-input-file']}
          htmlFor={props.id}
        >
          <img
            className="w-[18px] h-[18px]"
            src={iconType === 'upload' ? iconUpload : iconDownload}
            alt="icon-upload"
          />
          {textBtnFile}
        </label>
      </div>
      {validation ? (
        <input
          type="file"
          className="hidden"
          {...field}
          {...props}
          value=""
          onChange={validation ? (props.onChange ? props.onChange : handlerChange) : props.onChange}
        />
      ) : (
        <input
          type="file"
          className="hidden"
          {...props}
          value=""
          onChange={validation ? (props.onChange ? props.onChange : handlerChange) : props.onChange}
        />
      )}
      {validation && meta.touched && meta.error ? (
        <div className="text-[13px] text-red-600 break-normal">{meta.error}</div>
      ) : null}
    </div>
  );
};

InputFile.defaultProps = {
  validation: true,
  textBtnFile: 'Unggah',
  iconType: 'upload',
  classNameBoxFileName: '',
  // requiredLabel: true,
  disabled: false,
};

InputFile.propTypes = {
  classNameContainer: PropTypes.string,
  className: PropTypes.string,
  validation: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelBox: PropTypes.string,
  classNameLabelBox: PropTypes.string,
  textBtnFile: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['download', 'upload']),
  btnFileOnClick: PropTypes.func,
  classNameBoxFileName: PropTypes.string,
  namefile: PropTypes.string,
  classNameNamefile: PropTypes.string,
  // requiredLabel: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default InputFile;
