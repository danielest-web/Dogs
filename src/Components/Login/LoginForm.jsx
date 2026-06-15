import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/userForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, loading, error } = React.useContext(UserContext);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username.validate() || !password.validate()) return;

    const logged = await userLogin(username.value, password.value);
    setSuccess(logged);
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
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button disabled={loading}>
            {loading ? "Acessando..." : "Entrar"}
          </Button>
        )}
      </form>
      <Link to="/login/perdeu">Perdeu a senha?</Link>
      <br />
      <Link to="/login/criar">Crie sua conta</Link>
    </div>
  );
};
export default LoginForm;
