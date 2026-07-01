import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getUser = React.useCallback(async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Nao foi possivel buscar o usuario.");
    }

    setData(json);
    setLogin(true);
  }, []);

  const userLogin = React.useCallback(
    async (username, password) => {
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
        navigate("/conta");
        return true;
      } catch (err) {
        setError(err.message);
        setLogin(false);
        setData(null);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [getUser, navigate],
  );

  const userLogout = React.useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setLogin(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);

        const { url, options } = TOKEN_VALIDATE_POST(token);
        const response = await fetch(url, options);

        if (!response.ok) throw new Error("Token invalido");

        await getUser(token);
      } catch (err) {
        setData(null);
        setLogin(false);
        window.localStorage.removeItem("token");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    autoLogin();
  }, [getUser]);

  return (
    <UserContext.Provider
      value={{ data, login, loading, error, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
