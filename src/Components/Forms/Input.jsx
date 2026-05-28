import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
