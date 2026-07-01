import React from 'react';
import { PHOTOS_GET } from '../api';
import useFetch from '../Hooks/useFetch';
import viewsIcon from '../Assets/visualizacao-black.svg?url';
import Error from './Helper/Error';
import styles from './Home.module.css';

const Home = () => {
  const { data: photos, loading, error, request } = useFetch();
  const [modalPhoto, setModalPhoto] = React.useState(null);

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({
      page: 1,
      total: 12,
      user: 0,
    });

    request(url, options);
  }, [request]);

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
    <section className={`${styles.home} container animeLeft`}>
      <div className={styles.header}>
        <h1 className="title">Fotos</h1>
        <p>Veja as publicacoes mais recentes da comunidade Dogs.</p>
      </div>

      {loading && <p className={styles.status}>Carregando fotos...</p>}
      <Error error={error} />

      {photos?.length ? (
        <ul className={styles.grid}>
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className={`${styles.photo} ${
                index % 6 === 0 ? styles.photoLarge : ''
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
        !loading && <p className={styles.status}>Nenhuma foto encontrada.</p>
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
              x
            </button>
            <img
              className={styles.modalImg}
              src={modalPhoto.src}
              alt={modalPhoto.title}
            />
            <div className={styles.modalInfo}>
              <h2>{modalPhoto.title}</h2>
              <div className={styles.modalDetails}>
                {modalPhoto.author ? <span>@{modalPhoto.author}</span> : null}
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
    </section>
  );
};

export default Home;
