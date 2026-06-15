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
  console.log("aqui e o valor tipo" ,type);
  //o que e  esse type que a gente ta passando aqui? Ele é o tipo do input, ou seja, se for email, ele vai validar o email, se for password, ele vai validar a senha, e assim por diante. Se for false, ele não vai validar nada, ou seja, qualquer valor é valido.
  //

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(currentValue) {
    console.log("aqui e o valor do currentValue" ,currentValue);
    if (type === false) return true;

    const sanitizedValue = String(currentValue ?? '').trim();
    // o que sanitizedValue faz? Ele pega o valor digitado pelo usuario, transforma ele em string (caso seja null ou undefined), e tira os espaços em branco do começo e do final do valor. Assim, se o usuario digitar um valor com espaços em branco no começo ou no final, esses espaços em branco vão ser ignorados na hora de validar o valor.

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
