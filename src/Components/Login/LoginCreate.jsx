import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/userForm';
import styles from './LoginCreate.module.css';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const isFormValid =
      username.validate() && email.validate() && password.validate();

    if (!isFormValid) return;

    try {
      setError(null);
      setSuccess(false);
      setCreating(true);

      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Nao foi possivel criar a conta.');
      }

      const logged = await userLogin(username.value, password.value);

      if (!logged) {
        throw new Error(
          'Conta criada, mas nao foi possivel fazer login automatico.',
        );
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Crie sua conta</h1>
      <p className={styles.description}>
        Preencha seus dados para cadastrar um novo usuario.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuario"
          type="text"
          name="create-username"
          value={username.value}
          onChange={username.onChange}
          onBlur={username.onBlur}
          error={username.error}
        />
        <Input
          label="Email"
          type="email"
          name="create-email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          error={email.error}
        />
        <Input
          label="Senha"
          type="password"
          name="create-password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          error={password.error}
        />
        {success ? (
          <p className={styles.success}>Formulario validado com sucesso.</p>
        ) : null}
        <Error error={error} />
        {creating ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
      </form>
      <Link className={styles.back} to="/login">
        Voltar para login
      </Link>
    </section>
  );
};
export default LoginCreate;
