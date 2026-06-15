import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import { UserStorage } from "./UserContext";
const App = () => {
  return (
    <BrowserRouter>
      //serve para o React conseguir olhar a URL do navegador.
      <UserStorage>
        <div className="App">
          <Header />
          //Como ele está fora de Routes, ele aparece em todas as páginas.
          <main className="appBody">
            <Routes>
              {" "}
              //Routes pergunta: "Qual é a URL atual?" //Aí ele procura um Route
              que combine com essa URL.
              <Route path="/" element={<Home />} /> //mostre o componente Home
              <Route path="/login/*" element={<Login />} />
              //mostre o componente login ou demais variações de login. O
              asterisco *é um curinga que indica que qualquer coisa que venha
              depois de /login deve ser tratada como parte do caminho para o
              componente Login. Isso permite que o componente Login tenha suas
              próprias rotas internas, como /login/criar, /login/perdeu, etc.
              Assim, quando o usuário acessar /login/criar, o React Router ainda
              renderizará o componente Login, e dentro dele, as rotas internas
              poderão determinar qual subcomponente mostrar com base no caminho
              específico. // aceita qualquer coisa depois de /login, como
              /login/criar ou /login/perdeu, e renderiza o componente Login, que
              tem suas próprias rotas internas para lidar com essas variações.
            </Routes>
            /* Routes = escolhe Route = opção path = caminho element = tela que
            vai aparecer /*App.jsx escolhe a área: Login Login.jsx escolhe a
            tela específica: LoginForm, LoginCreate, perdeu senha ou resetar
            senha */
          </main>
          <Footer />
        </div>
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
