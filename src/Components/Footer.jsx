import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as DogsFooter } from '../Assets/dogs-footer.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} container`}>
        <DogsFooter className={styles.dog} />
        <p>Dogs. Alguns direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
