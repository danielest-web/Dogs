import React from 'react';
import { Link } from 'react-router-dom';

const LoginCreate = () => {
  return (
    <div>
      <h1>Crie sua conta</h1>
      <p>Preencha seus dados para cadastrar um novo usuario.</p>
      <form>
        <label htmlFor="create-username">Usuario</label>
        <input id="create-username" type="text" />

        <label htmlFor="create-email">Email</label>
        <input id="create-email" type="email" />

        <label htmlFor="create-password">Senha</label>
        <input id="create-password" type="password" />

        <button>Cadastrar</button>
      </form>
      <Link to="/login">Voltar para login</Link>
    </div>
  );
};
export default LoginCreate;
