import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />} />
        /*Se a pessoa entrou exatamente em /login,
          mostre LoginForm*/
        <Route path="criar" element={<LoginCreate />} />
        <Route path="perdeu" element={<LoginPasswordLost />} />
        <Route path="resetar" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;

//Se a pessoa entrou exatamente em /login,
//mostre LoginForm

/*
/login/* abre a porta para a área de login.

Dentro dessa área:

index   → /login
criar   → /login/criar
perdeu  → /login/perdeu
resetar → /login/resetar

*/