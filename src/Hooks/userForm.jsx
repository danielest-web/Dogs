import React from 'react';

const validators = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    empty: 'Preencha o email',
    message: 'Preencha um email valido',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(currentValue) {
    if (type === false) return true;

    const sanitizedValue = String(currentValue ?? '').trim();

    if (sanitizedValue.length === 0) {
      setError(validators[type]?.empty || 'Preencha um valor');
      return false;
    }

    if (validators[type] && !validators[type].regex.test(sanitizedValue)) {
      setError(validators[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  function onBlur({ target }) {
    validate(target.value);
  }

  return {
    value,
    onChange,
    onBlur,
    error,
    validate: () => validate(value),
  };
};

export default useForm;
