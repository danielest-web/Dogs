import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, name, value, onChange, error, erro }) => {
  const errorMessage = error || erro;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!errorMessage}
      />
      {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
    </div>
  );
};

export default Input;
