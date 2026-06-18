import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/userForm';
import styles from './LoginCreate.module.css';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const [success, setSuccess] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const isFormValid =
      username.validate() && email.validate() && password.validate();

    setSuccess(isFormValid);
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
        <Button>Cadastrar</Button>
      </form>
      <Link className={styles.back} to="/login">
        Voltar para login
      </Link>
    </section>
  );
};
export default LoginCreate;
