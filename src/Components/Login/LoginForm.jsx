import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/input';
import Button from '../Forms/Button';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(
        'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Nao foi possivel fazer login.');
      }

      console.log(json);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuario"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {error ? <p>{error}</p> : null}
        {success ? <p>Login enviado com sucesso.</p> : null}
        <Button disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
      <Link to="/login/perdeu">Perdeu a senha?</Link>
      <br />
      <Link to="/login/criar">Crie sua conta</Link>
    </div>
  );
};
export default LoginForm;
