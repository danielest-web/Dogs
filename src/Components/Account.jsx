import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Feed from './Feed/Feed';
import FeedHeader from './Feed/FeedHeader';
import FeedPhotoPost from './Feed/FeedPhotoPost';
import FeedStats from './Feed/FeedStats';

const Account = () => {
  const { data, login } = React.useContext(UserContext);

  if (login === null) {
    return (
      <section className="container loadingPage">
        <p>Verificando login...</p>
      </section>
    );
  }
  if (login === false) return <Navigate to="/login" />;

  return (
    <section className="container">
      <FeedHeader />
      {data ? <p>Bem-vindo, {data.nome || data.username}.</p> : null}
      <Routes>
        <Route path="/" element={<Feed user={data?.id} title="Minhas fotos" />} />
        <Route path="home" element={<Feed user={0} title="Home" />} />
        <Route path="estatisticas" element={<FeedStats user={data?.id} />} />
        <Route path="adicionar" element={<FeedPhotoPost title="Adicionar fotos" />} />
        <Route path="postar" element={<FeedPhotoPost title="Postar fotos" />} />
      </Routes>
    </section>
  );
};

export default Account;
