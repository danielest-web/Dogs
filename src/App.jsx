import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import Account from "./Components/Account";
import { UserStorage } from "./UserContext";
const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <div className="App">
          <Header />

          <main className="appBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/conta" element={<Account />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
