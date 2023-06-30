export const inputOnlyNumber = (formik, name, value, firstZero = true) => {
  if (firstZero) {
    return /^[0-9\b]+$/.test(value) || value === '' ? formik.setFieldValue(name, value) : '';
  } else {
    if (/^0/.test(value)) {
      return formik.setFieldValue(name, '');
    }
    return /^[0-9\b]+$/.test(value) || value === '' ? formik.setFieldValue(name, value) : '';
  }
};
