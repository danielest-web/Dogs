import React from 'react';
import { NavLink } from 'react-router-dom';
import feed from '../../Assets/feed.svg?url';
import estatisticas from '../../Assets/estatisticas.svg?url';
import adicionar from '../../Assets/adicionar.svg?url';
import enviar from '../../Assets/enviar.svg?url';
import styles from './FeedHeader.module.css';

const FeedHeader = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function closeMobileMenu() {
    setMobileMenu(false);
  }

  return (
    <header className={styles.header}>
      <div>
        <span className={styles.eyebrow}>Painel</span>
        <h1 className={styles.title}>Conta</h1>
      </div>
      <button
        type="button"
        className={`${styles.mobileButton} ${mobileMenu ? styles.mobileButtonActive : ''}`}
        onClick={() => setMobileMenu((active) => !active)}
        aria-label="Abrir menu"
        aria-expanded={mobileMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        className={`${styles.nav} ${mobileMenu ? styles.navActive : ''}`}
        aria-label="Menu da conta"
      >
        <NavLink to="/conta" end title="Minhas fotos" onClick={closeMobileMenu}>
          <img src={feed} alt="" />
          Minhas fotos
        </NavLink>
        <NavLink to="/conta/estatisticas" title="Estatisticas" onClick={closeMobileMenu}>
          <img src={estatisticas} alt="" />
          Estatisticas
        </NavLink>
        <NavLink to="/conta/adicionar" title="Adicionar fotos" onClick={closeMobileMenu}>
          <img src={adicionar} alt="" />
          Adicionar fotos
        </NavLink>
        <NavLink to="/conta/postar" title="Postar fotos" onClick={closeMobileMenu}>
          <img src={enviar} alt="" />
          Postar fotos
        </NavLink>
      </nav>
    </header>
  );
};

export default FeedHeader;
