# GraphQL API

## Endpoint

```text
http://localhost:3000/graphql
```

---

## Autenticação

Operações protegidas exigem header:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

---

## Mutation: registerUser

Cria um usuário.

```graphql
mutation {
  registerUser(input: {
    name: "Vitor"
    email: "vitor@email.com"
    password: "123456"
  }) {
    id
    name
    email
    createdAt
  }
}
```

---

## Mutation: login

Autentica usuário.

```graphql
mutation {
  login(input: {
    email: "admin@routermini.com"
    password: "admin123"
  }) {
    accessToken
  }
}
```

---

## Mutation: calculateRoute

Calcula uma rota.

```graphql
mutation {
  calculateRoute(input: {
    originAddress: "Campo Grande MS"
    destinationAddress: "Aeroporto Internacional de Campo Grande MS"
  }) {
    originAddress
    destinationAddress
    distanceKm
    durationText
    encodedPolyline
    points {
      sequence
      lat
      lng
    }
  }
}
```

---

## Mutation: saveRoute

Salva uma rota calculada.

```graphql
mutation {
  saveRoute(input: {
    originAddress: "Campo Grande MS"
    destinationAddress: "Aeroporto Internacional de Campo Grande MS"
    distanceKm: 10.5
    durationText: "15 minutos"
    points: [
      { sequence: 1, lat: -20.45, lng: -54.61 }
      { sequence: 2, lat: -20.46, lng: -54.62 }
    ]
  }) {
    id
    originAddress
    destinationAddress
    distanceKm
    durationText
    createdAt
  }
}
```

---

## Query: routes

Lista rotas do usuário autenticado.

```graphql
query {
  routes {
    id
    originAddress
    destinationAddress
    distanceKm
    durationText
    createdAt
    points {
      sequence
      lat
      lng
    }
  }
}
```

---

## Query: route

Busca rota por ID.

```graphql
query {
  route(id: "uuid") {
    id
    originAddress
    destinationAddress
    points {
      sequence
      lat
      lng
    }
  }
}
```

---

## Query: health

```graphql
query {
  health
}
```
