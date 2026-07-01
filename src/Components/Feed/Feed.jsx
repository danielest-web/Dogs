import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import viewsIcon from '../../Assets/visualizacao-black.svg?url';
import styles from './Feed.module.css';

const Feed = ({ user }) => {
  const { data: photos, loading, error, request } = useFetch();

  React.useEffect(() => {
    if (user) {
      const { url, options } = PHOTOS_GET({
        page: 1,
        total: 6,
        user,
      });

      request(url, options);
    }
  }, [user, request]);

  return (
    <div className={styles.feed}>
      <h2 className={styles.subtitle}>Seu feed</h2>
      {loading && <p className={styles.status}>Carregando...</p>}
      <Error error={error} />

      {photos?.length ? (
        <ul className={styles.grid}>
          {photos.map((photo) => (
            <li key={photo.id} className={styles.photo}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.info}>
                <span>{photo.title}</span>
                <span className={styles.views}>
                  <img src={viewsIcon} alt="" />
                  {photo.acessos}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className={styles.empty}>Voce ainda nao publicou fotos.</p>
        )
      )}
    </div>
  );
};

export default Feed;
