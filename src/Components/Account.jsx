import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Account = () => {
  const { data, login } = React.useContext(UserContext);

  if (login === false) return <Navigate to="/login" />;

  return (
    <section className="container">
      <h1 className="title">Minha conta</h1>
      {data ? <p>Bem-vindo, {data.nome || data.username}.</p> : null}
    </section>
  );
};

export default Account;
