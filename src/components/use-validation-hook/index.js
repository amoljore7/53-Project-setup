import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

/**
 *
 * Does form state management and validation.
 * NOTE: in handleChange method provide a deep copy of initial object
 *
 * @param initialValues       : the initial state of the form
 * @param validationSchema    : A yup schema only
 * @param onSubmit            : function to be triggered when all data is correct
 *
 * @returns                   : object {
 *                                        names,
 *                                        errors
 *                                        initialValues,
 *                                        values,
 *                                        touched,
 *                                        handleSubmit
 *                                        handleChange
 *                                        handleBlur
 *                                        resetForm
 *                                        resetValues
 *                                        isValid
 *                                      }
 *
 */
const useValidation = ({ initialValues, validationSchema, onSubmit }) => {
  const names = getAllnames(initialValues);
  const [errors, setErrors] = useState(nullAll(initialValues));
  const [touched, setTouched] = useState(nullAll(initialValues));
  const [values, setValues] = useState({ ...initialValues });
  const [context, setContext] = useState('');

  useEffect(() => {
    if (!isEqual(touched, touchAll(initialValues))) {
      //NOTE: Should not get called in case of handleSubmit when all fields are touched
      validate();
    }
  }, [values, touched]);

  useEffect(() => {
    if (context) {
      validationSchema
        .validate(values, { abortEarly: false, context: context })
        .then(() => {
          setErrors(() => nullAll(initialValues));
          setContext('');
        })
        .catch(function (err) {
          const errorsAtSubmit = nullAll(initialValues);
          err?.inner?.forEach((e) => {
            errorsAtSubmit[e.path] = e.message;
          });
          setErrors(() => errorsAtSubmit);
          setContext('');
        });
    }
  }, [context]);

  const validate = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors(() => nullAll(initialValues));
      })
      .catch(function (err) {
        const errorsAtSubmit = nullAll(initialValues);
        err?.inner?.forEach((e) => {
          errorsAtSubmit[e.path] = e.message;
        });
        setErrors(() => errorsAtSubmit);
      });
  };

  const handleChange = (label, value) => {
    setContext('');
    setValues((values) => ({ ...values, [label]: value }));
  };

  const handleBlur = (label) => {
    setTouched((touched) => ({ ...touched, [label]: true }));
    setContext(label);
  };

  const handleSubmit = () => {
    setTouched(touchAll(initialValues));
    validationSchema
      .validate(values, { abortEarly: false, context: 'all' })
      .then(() => {
        setErrors(() => nullAll(initialValues));
        onSubmit(values);
      })
      .catch(function (err) {
        const errorsAtSubmit = nullAll(initialValues);
        err?.inner?.forEach((e) => {
          errorsAtSubmit[e.path] = e.message;
        });
        // NOTE: This is required to Indicate to developer,
        // the errors which are not related to validation
        console.log(err.message);
        setErrors(() => errorsAtSubmit);
      });
  };

  const resetForm = () => {
    setValues(() => ({ ...initialValues }));
    setTouched(() => nullAll(initialValues));
    setErrors(() => nullAll(initialValues));
  };

  const resetValues = (obj) => {
    setValues(() => ({ ...obj }));
  };

  const isValid = () => {
    let valid = true;
    for (const key in errors) {
      if (errors[key]) {
        valid = false;
        break;
      }
    }
    return valid;
  };

  return {
    names,
    errors,
    initialValues,
    values,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    resetValues,
    isValid,
  };
};

const nullAll = (values) => {
  let obj = {};
  for (const property in values) {
    obj = { ...obj, [property]: null };
  }
  return obj;
};
const touchAll = (values) => {
  let obj = {};
  for (const property in values) {
    obj = { ...obj, [property]: true };
  }
  return obj;
};

const getAllnames = (values) => {
  let obj = {};
  for (const property in values) {
    obj = { ...obj, [property]: property };
  }
  return obj;
};

export default useValidation;
