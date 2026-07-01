import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import viewsIcon from '../../Assets/visualizacao-black.svg?url';
import styles from './Feed.module.css';

const Feed = ({ user, title = 'Seu feed' }) => {
  const { data: photos, loading, error, request } = useFetch();
  const [modalPhoto, setModalPhoto] = React.useState(null);

  React.useEffect(() => {
    if (user !== null && user !== undefined) {
      const { url, options } = PHOTOS_GET({
        page: 1,
        total: 12,
        user,
      });

      request(url, options);
    }
  }, [user, request]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') setModalPhoto(null);
    }

    if (modalPhoto) window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalPhoto]);

  return (
    <div className={styles.feed}>
      <h2 className={styles.subtitle}>{title}</h2>
      {loading && <p className={styles.status}>Carregando...</p>}
      <Error error={error} />

      {photos?.length ? (
        <ul className={styles.grid}>
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className={`${styles.photo} ${
                index % 7 === 0 ? styles.photoLarge : ''
              }`}
            >
              <button
                type="button"
                className={styles.photoButton}
                onClick={() => setModalPhoto(photo)}
                aria-label={`Abrir foto ${photo.title}`}
              >
                <img src={photo.src} alt={photo.title} />
                <div className={styles.info}>
                  <span>{photo.title}</span>
                  <span className={styles.views}>
                    <img src={viewsIcon} alt="" />
                    {photo.acessos}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className={styles.empty}>Voce ainda nao publicou fotos.</p>
        )
      )}

      {modalPhoto ? (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${modalPhoto.title}`}
          onMouseDown={({ target, currentTarget }) => {
            if (target === currentTarget) setModalPhoto(null);
          }}
        >
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setModalPhoto(null)}
              aria-label="Fechar modal"
            >
              ×
            </button>
            <img
              className={styles.modalImg}
              src={modalPhoto.src}
              alt={modalPhoto.title}
            />
            <div className={styles.modalInfo}>
              <h3>{modalPhoto.title}</h3>
              <div className={styles.modalDetails}>
                {modalPhoto.peso ? <span>{modalPhoto.peso} kg</span> : null}
                {modalPhoto.idade ? <span>{modalPhoto.idade} anos</span> : null}
                <span className={styles.views}>
                  <img src={viewsIcon} alt="" />
                  {modalPhoto.acessos}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Feed;
