import React from 'react';
import { Link } from 'react-router-dom';

const LoginPasswordLost = () => {
  return (
    <div>
      <h1>Perdeu a senha?</h1>
      <p>Informe seu usuario ou email para iniciar a recuperacao.</p>
      <form>
        <label htmlFor="lost-login">Usuario / Email</label>
        <input id="lost-login" type="text" />
        <button>Enviar email</button>
      </form>
      <Link to="/login">Voltar para login</Link>
    </div>
  );
};

export default LoginPasswordLost;
