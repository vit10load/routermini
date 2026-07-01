# RouterMini App

Sistema Full Stack para cálculo, visualização e persistência de rotas usando **NestJS**, **GraphQL**, **Vue 3**, **TypeScript**, **PostgreSQL/PostGIS**, **Google Maps API**, **JWT** e **Docker**.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura geral](#arquitetura-geral)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Fluxos principais](#fluxos-principais)
- [Como executar](#como-executar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Usuário padrão](#usuário-padrão)
- [Documentação técnica](#documentação-técnica)
- [Diferenciais implementados](#diferenciais-implementados)
- [Melhorias futuras](#melhorias-futuras)

---

## Sobre o projeto

O **RouterMini** é uma aplicação Full Stack construída para receber um endereço de coleta e um endereço de entrega, calcular a rota utilizando a API do Google Maps, exibir o trajeto em um mapa incorporado e permitir a persistência da rota em banco de dados espacial.

O projeto foi desenvolvido seguindo uma arquitetura modular, com separação clara entre frontend, backend, autenticação, persistência, integração externa e documentação.

Além dos requisitos principais do desafio, o sistema também implementa autenticação JWT, cadastro de usuários, rotas protegidas, associação de rotas ao usuário autenticado e ambiente com Docker Compose.

---

## Funcionalidades

### Usuários e autenticação

- Cadastro de usuários.
- Login.
- Logout.
- Autenticação via JWT.
- Proteção de rotas no frontend.
- Proteção de operações GraphQL no backend.
- Exibição do usuário autenticado no layout principal.

### Rotas

- Inserção de endereço de coleta.
- Inserção de endereço de entrega.
- Cálculo de rota via Google Maps.
- Retorno de distância total.
- Retorno de tempo estimado.
- Retorno de pontos intermediários ordenados.
- Renderização da rota no mapa.
- Persistência da rota no PostgreSQL/PostGIS.
- Listagem das rotas salvas.
- Filtro por origem ou destino.
- Visualização de uma rota salva novamente no mapa.

### Infraestrutura

- Docker Compose.
- PostgreSQL com PostGIS.
- Backend NestJS containerizado.
- Frontend Vue containerizado.
- Variáveis de ambiente.

---

## Tecnologias

### Backend

- NestJS
- GraphQL
- Apollo Server
- TypeORM
- PostgreSQL
- PostGIS
- JWT
- Passport
- bcrypt
- Docker

### Frontend

- Vue 3
- TypeScript
- Vite
- Apollo Client
- Vue Router
- Google Maps JavaScript API
- jwt-decode

### Banco de dados

- PostgreSQL
- PostGIS
- JSONB
- geography(LineString, 4326)

---

## Arquitetura geral

```text
┌───────────────────────────────┐
│            Vue 3              │
│   Pages / Layouts / Services  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         Apollo Client         │
└───────────────┬───────────────┘
                │ GraphQL
                ▼
┌───────────────────────────────┐
│            NestJS             │
│ Resolvers / Services / Repos  │
└───────┬─────────────────┬─────┘
        │                 │
        ▼                 ▼
┌──────────────┐   ┌─────────────────┐
│ Google Maps  │   │ PostgreSQL      │
│ API          │   │ + PostGIS       │
└──────────────┘   └─────────────────┘
```

---

## Estrutura do projeto

```text
routermini/
├── backend/
│   └── routermini-api/
│       ├── src/
│       │   ├── database/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   └── routes/
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── Dockerfile
│       └── package.json
│
├── frontend/
│   └── routermini-web/
│       ├── src/
│       │   ├── apollo/
│       │   ├── auth/
│       │   ├── components/
│       │   ├── graphql/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── router/
│       │   ├── services/
│       │   └── types/
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml
├── README.md
└── docs/
```

---

## Fluxos principais

### Autenticação

```text
Login/Cadastro
      ↓
GraphQL Mutation
      ↓
AuthService / UsersService
      ↓
PostgreSQL
      ↓
JWT
      ↓
Frontend salva token
      ↓
Apollo envia Authorization Bearer
```

### Cálculo de rota

```text
Usuário informa origem/destino
      ↓
Frontend chama RouteService
      ↓
Apollo envia mutation calculateRoute
      ↓
NestJS chama Google Maps
      ↓
Backend decodifica pontos
      ↓
Frontend renderiza no mapa
```

### Persistência

```text
Usuário autenticado salva rota
      ↓
GraphQL Guard valida JWT
      ↓
RoutesService
      ↓
RouteRepository
      ↓
ST_GeogFromText(LINESTRING)
      ↓
PostGIS geography(LineString,4326)
```

---

## Como executar

### Com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Acesse:

```text
Frontend: http://localhost:5173
Backend GraphQL: http://localhost:3000/graphql
```

### Backend local

```bash
cd backend/routermini-api
npm install
npm run start:dev
```

### Frontend local

```bash
cd frontend/routermini-web
npm install
npm run dev
```

---

## Variáveis de ambiente

### Backend

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=routermini
JWT_SECRET=routermini_dev_secret
JWT_EXPIRES_IN=1d
GOOGLE_MAPS_API_KEY=sua_chave
```

### Frontend

```env
VITE_GRAPHQL_URL=http://localhost:3000/graphql
VITE_GOOGLE_MAPS_API_KEY=sua_chave
```

### Docker Compose

Na raiz:

```env
GOOGLE_MAPS_API_KEY=sua_chave
```

---

## Usuário padrão

O projeto cria um usuário administrativo inicial no banco durante o boot da aplicação:

```text
E-mail: admin@routermini.com
Senha: admin123
```

---

## Documentação técnica

Arquivos complementares:

- `docs/architecture.md`
- `docs/backend.md`
- `docs/frontend.md`
- `docs/graphql-api.md`
- `docs/authentication.md`
- `docs/postgis.md`
- `docs/deployment.md`
- `docs/storybook.md`
- `docs/presentation.md`
- `docs/decisions.md`

---

## Diferenciais implementados

- Arquitetura modular.
- Separação entre Pages, Services e Apollo no frontend.
- Repository Pattern.
- Gateway Pattern para integração com Google Maps.
- JWT com Guards GraphQL.
- Cadastro e login.
- Rotas associadas ao usuário autenticado.
- Persistência espacial com PostGIS.
- Docker Compose.
- Layout responsivo.
- Listagem e filtro de rotas salvas.

---

## Melhorias futuras

- Storybook completo.
- Testes unitários com Jest.
- GitHub Actions.
- TypeORM migrations definitivas.
- Google Places API para autocomplete.
- Refresh token.
- Controle de papéis.
- Dashboard estatístico.
- Observabilidade.
- Deploy em nuvem.

---

## Autor

**Vitor Oliveira**
