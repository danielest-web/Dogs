import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error("Token invalido");

          await getUser(token);
        } catch (erro) {
          window.localStorage.removeItem("token");
          setError(erro.message);
          setLogin(false);
          setData(null);
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Nao foi possivel buscar o usuario.");
    }

    setData(json);
    setLogin(true);
    console.log("aqui e o valor do json", json);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Nao foi possivel fazer login.");
      }

      window.localStorage.setItem("token", json.token);
      await getUser(json.token);
      return true;
    } catch (err) {
      setError(err.message);
      setLogin(false);
      setData(null);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setData(null);
    setError(null); 
    setLogin(false);
    setLoading(false);  
    window.localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ data, login, loading, error, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
