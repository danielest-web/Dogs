import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/userForm";
import { UserContext } from "../../UserContext";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm("password");
  const { userLogin, loading, error } = React.useContext(UserContext);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;

    const logged = await userLogin(username.value, password.value);
    setSuccess(logged);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Error error={error} />
        {success ? <p>Sucesso ao fazer login.</p> : null}
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button disabled={loading}>
            {loading ? "Acessando..." : "Entrar"}
          </Button>
        )}
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <section className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>
          Ainda nao tem uma conta? Crie seu cadastro para compartilhar fotos dos
          seus dogs.
        </p>
        <Link className={styles.criar} to="/login/criar">
          Criar conta
        </Link>
      </section>
    </section>
  );
};

export default LoginForm;
