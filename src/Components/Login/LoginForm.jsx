import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/userForm';
import { TOKEN_POST } from '../../api';
import { USER_GET } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
    getUser(token);
  }, []); 


  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }


  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;
    //Se username não for válido OU password não for válido, pare a função.

    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      /*se você tentou logar antes e deu erro, não quer que o erro antigo fique aparecendo numa nova tentativa*/
      const response = await fetch(url, options);
     
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      getUser(json.token);
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
