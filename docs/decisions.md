# Decisões Arquiteturais

## GraphQL em vez de REST

GraphQL foi utilizado porque o desafio exigia essa tecnologia e também porque facilita a evolução do contrato da API.

Trade-off: exige maior cuidado com schema e autenticação no contexto GraphQL.

---

## NestJS

NestJS foi escolhido por oferecer:

- modularidade;
- injeção de dependência;
- boa integração com GraphQL;
- arquitetura escalável.

---

## Vue 3

Vue 3 com Composition API oferece simplicidade, produtividade e boa organização com TypeScript.

---

## Repository Pattern

O Repository Pattern foi usado para isolar acesso ao banco.

Isso mantém services limpos.

---

## Gateway Pattern

O Google Maps foi isolado em gateway para evitar acoplamento com API externa.

---

## JWT

JWT permite autenticação stateless.

Ideal para uma aplicação SPA consumindo backend GraphQL.

---

## PostGIS

PostGIS foi usado porque rotas são dados espaciais.

Salvar apenas lat/lng soltas não representa adequadamente o trajeto.

---

## Services no frontend

As páginas foram desacopladas do Apollo Client.

Isso melhora manutenção e testabilidade.

---

## Docker

Docker facilita execução local e padronização do ambiente.

---

## Módulos

Separar Auth, Users e Routes permite evolução independente.
