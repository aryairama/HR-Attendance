/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import style from './style.module.css';
import iconEye from '../../../assets/icons/eye.png';

const Input = ({ classNameContainer, classNameLabel, label, className, validation, errorLabelEffect, ...props }) => {
  const [field, meta] = validation ? useField(props) : [];
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`${style['input-container']} ${classNameContainer}`}>
      <div className={`relative`}>
        {label && (
          <label
            className={`${style['input-label']} ${
              validation && errorLabelEffect && meta.touched && meta.error ? style['error-input-label'] : null
            } ${classNameLabel}`}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        {validation ? (
          <input
            autoComplete="off"
            spellCheck={false}
            className={`${style['input']} ${className}`}
            {...field}
            {...props}
            type={props.type === 'password' ? (showPassword === false ? 'password' : 'text') : props.type}
            onChange={props.onChange ? props.onChange : field.onChange}
          />
        ) : (
          <input
            autoComplete="off"
            spellCheck={false}
            type={props.type === 'password' ? (showPassword === false ? 'password' : 'text') : props.type}
            className={`${style['input']} ${className}`}
            {...props}
          />
        )}
        <span
          className={`${style['label-effect']} ${
            validation && errorLabelEffect && meta.touched && meta.error ? style['error-label-effect'] : null
          }`}
        ></span>
        {props.type === 'password' && (
          <img
            onClick={() => setShowPassword(!showPassword)}
            className={`${style['input-icon-password']}`}
            src={iconEye}
            alt="icon-password"
          />
        )}
      </div>
      {props.children}
    </div>
  );
};

Input.defaultProps = {
  classNameContainer: '',
  classNameLabel: '',
  className: '',
  id: '',
  label: '',
  validation: true,
  errorLabelEffect: false,
};

Input.propTypes = {
  classNameContainer: PropTypes.string,
  classNameLabel: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.bool,
  errorLabelEffect: PropTypes.bool,
};

export default Input;
