import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import styles from './FeedStats.module.css';

const FeedStats = ({ user }) => {
  const { data: photos, loading, error, request } = useFetch();

  React.useEffect(() => {
    if (user) {
      const { url, options } = PHOTOS_GET({
        page: 1,
        total: 50,
        user,
      });

      request(url, options);
    }
  }, [user, request]);

  const totalAcessos = photos?.reduce(
    (total, photo) => total + Number(photo.acessos),
    0,
  );

  return (
    <section className={styles.stats}>
      <h2 className={styles.subtitle}>Estatisticas</h2>
      {loading && <p>Carregando...</p>}
      <Error error={error} />

      {photos ? (
        <div className={styles.grid}>
          <div className={styles.card}>
            <span>Fotos</span>
            <strong>{photos.length}</strong>
          </div>
          <div className={styles.card}>
            <span>Visualizacoes</span>
            <strong>{totalAcessos}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default FeedStats;
