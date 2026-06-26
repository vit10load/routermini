# 🚀 RouterMini App

<p align="center">

![Vue](https://img.shields.io/badge/Vue%203-4FC08D?logo=vue.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![PostGIS](https://img.shields.io/badge/PostGIS-336791)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)

</p>

---

# 📌 Sobre

RouterMini é uma aplicação Full Stack desenvolvida para planejamento, cálculo, visualização e persistência de rotas utilizando Google Maps.

O projeto foi desenvolvido utilizando uma arquitetura modular baseada em NestJS no backend e Vue 3 no frontend, consumindo uma API GraphQL e persistindo informações geográficas utilizando PostgreSQL com PostGIS.

Além dos requisitos obrigatórios do desafio técnico, foram implementados recursos adicionais como autenticação JWT, proteção de rotas, gerenciamento de usuários, Docker, arquitetura desacoplada entre frontend e backend e organização baseada em módulos.

---

# 🎯 Objetivos

A aplicação permite:

- Calcular rotas utilizando Google Maps.
- Exibir a rota em mapa incorporado.
- Persistir rotas utilizando PostGIS.
- Listar rotas previamente cadastradas.
- Visualizar novamente qualquer rota.
- Gerenciar usuários.
- Autenticar utilizando JWT.
- Proteger toda a aplicação através de autenticação baseada em token.

---

# 🏗 Arquitetura

## Visão Geral

```text
                     Vue 3

                        │

                        ▼

                  Apollo Client

                        │

                        ▼

                  GraphQL API

                        │

                        ▼

                     NestJS

          ┌─────────────┴──────────────┐

          ▼                            ▼

 Google Maps API               PostgreSQL

                                   │

                                PostGIS
```

---

# Backend

A aplicação foi construída utilizando arquitetura modular.

Cada módulo possui responsabilidades bem definidas.

```text
Modules

├── Auth
├── Users
└── Routes
```

Cada módulo é composto por:

```text
Resolver

↓

Service

↓

Repository

↓

Entity

↓

Database
```

### Auth

Responsável por:

- Login
- JWT
- Guards
- Estratégia Passport

### Users

Responsável por:

- Cadastro de usuários
- Consulta de usuários
- Hash de senha utilizando bcrypt

### Routes

Responsável por:

- Integração Google Maps
- Persistência PostGIS
- Listagem de rotas
- Visualização
- Cálculo da rota

---

# Frontend

O frontend foi organizado utilizando separação entre páginas, serviços e infraestrutura.

```text
Pages

↓

Services

↓

Apollo Client

↓

GraphQL

↓

Backend
```

As páginas não possuem conhecimento direto sobre GraphQL.

Toda comunicação é realizada através de Services especializados.

---

# Estrutura do Projeto

```text
backend/
frontend/
docker-compose.yml
README.md
```

## Backend

```text
config/
database/
modules/
```

## Frontend

```text
apollo/
auth/
components/
graphql/
layouts/
pages/
router/
services/
types/
```

---

# Fluxo de Autenticação

```text
Login

↓

GraphQL Mutation

↓

AuthService

↓

UsersService

↓

UserRepository

↓

PostgreSQL

↓

JWT

↓

Frontend

↓

Authorization Bearer
```

---

# Fluxo de Cálculo

```text
Usuário

↓

Origem

Destino

↓

GraphQL

↓

RoutesService

↓

GoogleMapsGateway

↓

Google Directions API

↓

Polyline

↓

Lista de Pontos

↓

Vue Google Maps
```

---

# Fluxo de Persistência

```text
Usuário autenticado

↓

JWT

↓

Guard

↓

RoutesService

↓

RouteRepository

↓

PostGIS

↓

geography(LineString)
```

---

# Banco de Dados

## Users

```text
id
name
email
passwordHash
createdAt
```

## Routes

```text
id
userId
originAddress
destinationAddress
distanceKm
durationText
points (jsonb)
path (geography)
createdAt
```

---

# Tecnologias

## Backend

- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- PostGIS
- JWT
- Passport
- Bcrypt

## Frontend

- Vue 3
- TypeScript
- Apollo Client
- Vue Router
- Google Maps JavaScript API

## Infraestrutura

- Docker
- Docker Compose

---

# Funcionalidades

- Cadastro de usuários
- Login
- Logout
- Rotas protegidas
- Cálculo de rota
- Visualização em mapa
- Persistência PostGIS
- Listagem de rotas
- Busca por origem e destino
- Visualização de rotas salvas

---

# Como executar

## Backend

```bash
npm install
npm run start:dev
```

## Frontend

```bash
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

---

# Diferenciais Implementados

- Arquitetura modular
- JWT
- Guards GraphQL
- Repository Pattern
- Gateway Pattern
- PostGIS
- Docker
- Layout responsivo
- Separação entre Pages e Services
- Proteção de rotas
- Usuários persistidos no banco

---

# Melhorias Futuras

- Migrations TypeORM
- Testes Jest
- GitHub Actions
- Storybook
- Places API (autocomplete)
- Toasts
- Skeleton Loading
- Dashboard estatístico

---

# Autor

**Vitor Oliveira**