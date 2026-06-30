# Arquitetura do RouterMini

## Visão geral

O RouterMini foi desenvolvido utilizando uma arquitetura modular com separação clara entre responsabilidades de interface, comunicação, aplicação, persistência e integrações externas.

A arquitetura busca equilibrar simplicidade e qualidade. O objetivo não foi aplicar Clean Architecture de forma excessiva, mas sim utilizar boas práticas compatíveis com o tamanho do projeto.

---

## Arquitetura geral

```text
Frontend Vue
    ↓
Services
    ↓
Apollo Client
    ↓
GraphQL
    ↓
NestJS Resolvers
    ↓
Services
    ↓
Repositories / Gateways
    ↓
PostgreSQL/PostGIS / Google Maps
```

---

## Princípios adotados

### Separação de responsabilidades

Cada camada possui um papel claro:

- Pages: interface e interação do usuário.
- Services frontend: regras de comunicação do frontend.
- Apollo Client: transporte GraphQL.
- Resolvers: entrada GraphQL no backend.
- Services backend: orquestração de regra de negócio.
- Repositories: persistência.
- Gateways: integrações externas.
- Entities: modelagem persistente.

---

## Backend

### Módulos

O backend foi dividido em três módulos principais:

```text
auth
users
routes
```

### AuthModule

Responsável por:

- Login.
- JWT.
- Passport Strategy.
- Guards GraphQL.
- Validação do token.

### UsersModule

Responsável por:

- Cadastro de usuários.
- Consulta de usuários por e-mail.
- Hash de senha com bcrypt.
- Criação de usuário padrão.

### RoutesModule

Responsável por:

- Cálculo da rota.
- Integração Google Maps.
- Persistência PostGIS.
- Listagem das rotas.
- Busca de rota por ID.
- Isolamento por usuário autenticado.

---

## Fluxo do backend

```text
GraphQL Resolver
       ↓
Service
       ↓
Repository ou Gateway
       ↓
Banco de dados ou API externa
```

---

## Resolver

O Resolver é responsável por receber Queries e Mutations GraphQL.

Ele não deve conter regra de negócio. Seu papel é:

- receber argumentos;
- recuperar usuário autenticado do contexto;
- chamar o serviço correto;
- retornar dados no formato esperado pelo schema.

---

## Service

O Service centraliza a regra de aplicação.

No módulo de rotas, por exemplo:

- calcular rota;
- salvar rota;
- listar rotas;
- buscar rota por ID.

O Service não sabe detalhes de SQL nem de PostGIS.

---

## Repository

O Repository isola persistência.

No caso das rotas, o Repository é responsável por:

- salvar rota no banco;
- construir LINESTRING;
- usar ST_GeogFromText;
- consultar rotas por usuário;
- consultar rota por ID e usuário.

---

## Gateway

O Gateway encapsula integração externa.

No RouterMini, a integração com Google Maps fica isolada nesse conceito. Isso evita que a regra de negócio conheça detalhes da API externa.

Caso a API externa mude futuramente, o impacto fica concentrado nessa camada.

---

## Frontend

O frontend foi organizado em:

```text
pages
layouts
components
services
graphql
apollo
router
auth
types
```

---

## Pages

São telas da aplicação:

- LoginPage
- RegisterPage
- HomePage
- SavedRoutesPage

Após a refatoração, as páginas não acessam GraphQL diretamente.

---

## Services

Os services encapsulam chamadas ao backend:

- auth.service.ts
- route.service.ts
- user.service.ts

Isso permite que as páginas sejam focadas em UI e fluxo, sem conhecer detalhes de GraphQL.

---

## Apollo

Apollo Client é responsável apenas pela comunicação GraphQL.

Também adiciona o token JWT no header Authorization.

---

## Router

Vue Router controla:

- rotas públicas;
- rotas privadas;
- redirecionamento para login;
- prevenção de acesso à tela de login quando autenticado.

---

## Layouts

Foram criados dois layouts principais:

- AuthLayout
- MainLayout

AuthLayout atende login e cadastro.

MainLayout atende telas autenticadas.

---

## Banco de dados

O banco utiliza PostgreSQL com PostGIS.

### Users

```text
id
name
email
passwordHash
createdAt
```

### Routes

```text
id
userId
originAddress
destinationAddress
distanceKm
durationText
points jsonb
path geography(LineString,4326)
createdAt
```

---

## Decisão sobre PostGIS

A rota não é armazenada apenas como latitude e longitude soltas.

O sistema usa:

```text
geography(LineString,4326)
```

Isso permite representar o trajeto como uma estrutura espacial real.

---

## Decisão sobre GraphQL

GraphQL foi utilizado porque:

- reduz excesso de endpoints;
- permite schema tipado;
- integra bem com Apollo Client;
- facilita documentação das operações;
- permite ao frontend pedir apenas os campos necessários.

---

## Decisão sobre JWT

JWT foi usado para autenticação stateless.

O frontend armazena o token e o envia no header Authorization.

O backend valida o token por meio de Guards GraphQL.

---

## Trade-offs

### Vantagens

- Código organizado.
- Camadas bem separadas.
- Fácil manutenção.
- Facilidade para testar serviços isolados.
- Boa apresentação técnica.

### Pontos de melhoria

- Implementar refresh token.
- Implementar roles.
- Melhorar migrações.
- Criar testes automatizados.
- Adicionar observabilidade.
