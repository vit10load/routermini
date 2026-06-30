# Frontend

## Stack

- Vue 3
- TypeScript
- Vite
- Apollo Client
- Vue Router
- Google Maps JavaScript API
- jwt-decode

---

## Estrutura

```text
src/
├── apollo/
├── auth/
├── components/
├── graphql/
├── layouts/
├── pages/
├── router/
├── services/
└── types/
```

---

## Arquitetura

```text
Page
 ↓
Service
 ↓
Apollo Client
 ↓
GraphQL API
```

As páginas não conhecem GraphQL diretamente.

---

## Layouts

### AuthLayout

Usado para:

- Login
- Cadastro

### MainLayout

Usado para:

- Home
- Rotas salvas

Contém:

- Header
- Nome do usuário logado
- Navegação
- Logout

---

## Pages

### LoginPage

Responsável por:

- capturar e-mail e senha;
- chamar AuthService;
- redirecionar após login.

### RegisterPage

Responsável por:

- cadastrar novo usuário;
- redirecionar para login.

### HomePage

Responsável por:

- informar origem/destino;
- calcular rota;
- exibir mapa;
- salvar rota.

### SavedRoutesPage

Responsável por:

- listar rotas;
- filtrar por origem/destino;
- selecionar rota;
- renderizar rota salva no mapa.

---

## Services

### auth.service.ts

Responsável por:

- login;
- register;
- logout;
- currentUser.

### route.service.ts

Responsável por:

- calculateRoute;
- saveRoute;
- listRoutes.

---

## Apollo Client

Configura endpoint GraphQL e adiciona token JWT.

```text
Authorization: Bearer token
```

---

## Vue Router

Controla rotas públicas e protegidas.

Rotas públicas:

- /auth/login
- /auth/register

Rotas protegidas:

- /
- /routes

---

## RouteMap

Componente responsável por:

- carregar Google Maps;
- desenhar Polyline;
- criar marcadores de origem/destino;
- ajustar zoom/bounds.

---

## Responsividade

O layout foi organizado para funcionar em desktop e celular.

---

## Melhorias futuras

- Storybook.
- Componentização adicional.
- Toasts.
- Skeleton loading.
- Google Places Autocomplete.
