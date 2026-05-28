import React from 'react';
import { Link } from 'react-router-dom';

const LoginPasswordReset = () => {
  return (
    <div>
      <h1>Redefina sua senha</h1>
      <p>Digite a nova senha e o codigo recebido para concluir o processo.</p>
      <form>
        <label htmlFor="reset-password">Nova senha</label>
        <input id="reset-password" type="password" />

        <label htmlFor="reset-code">Codigo</label>
        <input id="reset-code" type="text" />

        <button>Redefinir senha</button>
      </form>
      <Link to="/login">Voltar para login</Link>
    </div>
  );
};

export default LoginPasswordReset;
