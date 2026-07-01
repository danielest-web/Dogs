import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";
import sair from "../Assets/sair.svg?url";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <div className={styles.user}>
            <Link className={`${styles.login} ${styles.account}`} to="/conta">
              {data.nome}
            </Link>
            <button
              type="button"
              onClick={userLogout}
              className={styles.button}
              aria-label="Sair"
              title="Sair"
            >
              <img src={sair} alt="" />
            </button>
          </div>
        ) : (
          <div className={styles.auth}>
            <Link className={styles.login} to="/login">
              Login
            </Link>
            <Link className={styles.create} to="/login/criar">
              Criar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
