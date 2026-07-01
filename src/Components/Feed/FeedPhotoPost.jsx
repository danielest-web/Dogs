import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/userForm';
import { PHOTO_POST } from '../../api';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import styles from './FeedPhotoPost.module.css';

const FeedPhotoPost = ({ title }) => {
  const nome = useForm(false);
  const peso = useForm('peso');
  const idade = useForm(false);
  const [img, setImg] = React.useState({});
  const [imgError, setImgError] = React.useState(null);
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  function handleImgChange({ target }) {
    const file = target.files[0];

    if (file) {
      setImg({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      setImgError(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validFields = nome.validate() && peso.validate() && idade.validate();
    const validImg = !!img.raw;

    if (!validImg) setImgError('Selecione uma foto');
    if (!validFields || !validImg) return;

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    const { response } = await request(url, options);

    if (response?.ok) navigate('/conta');
  }

  return (
    <section className={styles.post}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.subtitle}>{title}</h2>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <label className={styles.file}>
          <span>Foto</span>
          <input type="file" name="img" accept="image/*" onChange={handleImgChange} />
          <strong>{img.raw ? img.raw.name : 'Escolher arquivo'}</strong>
        </label>
        {imgError ? <p className={styles.error}>{imgError}</p> : null}
        {loading ? (
          <Button disabled>Postando...</Button>
        ) : (
          <Button>Postar foto</Button>
        )}
        <Error error={error} />
      </form>

      {img.preview ? (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img.preview})` }}
          aria-label="Preview da foto"
        />
      ) : null}
    </section>
  );
};

export default FeedPhotoPost;
