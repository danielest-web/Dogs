import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/userForm';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;

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
            username: username.value,
            password: password.value,
          }),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Nao foi possivel fazer login.');
      }

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
          value={username.value}
          onChange={username.onChange}
          onBlur={username.onBlur}
          error={username.error}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          error={password.error}
        />
        {error ? <p>{error}</p> : null}
        {success ? <p>Sucesso ao fazer login.</p> : null}
        <Button disabled={loading}>
          {loading ? 'Acessando...' : 'Entrar'}
        </Button>
      </form>
      <Link to="/login/perdeu">Perdeu a senha?</Link>
      <br />
      <Link to="/login/criar">Crie sua conta</Link>
    </div>
  );
};
export default LoginForm;
