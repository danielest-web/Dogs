# Dogs

Dogs e uma rede social para compartilhar fotos de cachorros. O projeto permite criar conta, fazer login, publicar fotos com nome, peso e idade do cachorro, visualizar suas proprias publicacoes e tambem navegar por fotos de outros usuarios.

O app consome a API publica da Origamid:

```txt
https://dogsapi.origamid.dev/json
```

## Funcionalidades

- Cadastro e login de usuarios.
- Validacao de token para manter o usuario autenticado.
- Upload de fotos usando `FormData`.
- Feed da conta com as fotos do usuario logado.
- Home dentro da conta com fotos de todos os usuarios.
- Home publica com fotos recentes da comunidade.
- Modal para visualizar fotos em tamanho maior.
- Estatisticas simples com quantidade de fotos e total de acessos.
- Validacao de campos do formulario, incluindo regex para peso.

## Tecnologias

- React
- Vite
- React Router DOM
- CSS Modules
- ESLint

## Rotas Principais

- `/` - Home publica com fotos recentes.
- `/login` - Tela de login.
- `/login/criar` - Cadastro de usuario.
- `/conta` - Area logada com as fotos do usuario.
- `/conta/home` - Feed com fotos de todos os usuarios.
- `/conta/adicionar` - Publicar nova foto.
- `/conta/postar` - Publicar nova foto.
- `/conta/estatisticas` - Estatisticas das fotos do usuario.

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```txt
http://localhost:5173
```

## Scripts

```bash
npm run dev
```

Roda o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao na pasta `dist`.

```bash
npm run lint
```

Executa o ESLint no projeto.

```bash
npm run preview
```

Abre uma previa local da build de producao.

## Estrutura

```txt
src/
  Assets/        Icones e imagens
  Components/    Componentes da interface
  Hooks/         Hooks reutilizaveis
  api.jsx        Configuracao das chamadas para a API
  UserContext.jsx Estado global de autenticacao
```

## Observacoes

Para publicar fotos, o usuario precisa estar logado. As fotos sao enviadas para a API no endpoint `/api/photo` com `Authorization: Bearer token`.
