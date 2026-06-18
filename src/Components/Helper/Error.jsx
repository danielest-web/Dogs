import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;

  const cleanError = error.replace(/<\/?[^>]+(>|$)/g, '');

  return <p style={{ color: '#f31', margin: '1rem 0' }}>{cleanError}</p>;
};

export default Error;
