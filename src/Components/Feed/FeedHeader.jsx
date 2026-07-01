import React from 'react';
import { NavLink } from 'react-router-dom';
import feed from '../../Assets/feed.svg?url';
import estatisticas from '../../Assets/estatisticas.svg?url';
import adicionar from '../../Assets/adicionar.svg?url';
import enviar from '../../Assets/enviar.svg?url';
import styles from './FeedHeader.module.css';

const FeedHeader = () => {
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.eyebrow}>Painel</span>
        <h1 className={styles.title}>Conta</h1>
      </div>
      <nav className={styles.nav} aria-label="Menu da conta">
        <NavLink to="/conta" end title="Minhas fotos">
          <img src={feed} alt="" />
          Minhas fotos
        </NavLink>
        <NavLink to="/conta/estatisticas" title="Estatisticas">
          <img src={estatisticas} alt="" />
          Estatisticas
        </NavLink>
        <NavLink to="/conta/adicionar" title="Adicionar fotos">
          <img src={adicionar} alt="" />
          Adicionar fotos
        </NavLink>
        <NavLink to="/conta/postar" title="Postar fotos">
          <img src={enviar} alt="" />
          Postar fotos
        </NavLink>
      </nav>
    </header>
  );
};

export default FeedHeader;
