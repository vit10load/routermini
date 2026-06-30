# Roteiro de Apresentação

## Duração sugerida

15 minutos.

---

## 1. Introdução

Apresentar o RouterMini como uma aplicação Full Stack para cálculo, visualização e persistência de rotas.

---

## 2. Tecnologias

Mostrar:

- NestJS
- GraphQL
- Vue 3
- PostgreSQL/PostGIS
- Google Maps
- JWT
- Docker

---

## 3. Arquitetura

Explicar:

```text
Vue → Apollo → GraphQL → NestJS → Google Maps/PostGIS
```

---

## 4. Backend

Mostrar módulos:

- Auth
- Users
- Routes

Explicar Repository Pattern e Gateway Pattern.

---

## 5. Frontend

Mostrar:

- Layouts
- Pages
- Services
- Apollo
- Vue Router

---

## 6. Demonstração

Fluxo:

1. Cadastro.
2. Login.
3. Calcular rota.
4. Visualizar no mapa.
5. Salvar rota.
6. Ver rotas salvas.
7. Filtrar.
8. Logout.

---

## 7. Banco/PostGIS

Explicar:

- geography(LineString)
- points jsonb
- userId

---

## 8. Perguntas prováveis

### Por que GraphQL?

Porque permite schema tipado, menor acoplamento de endpoints e integração direta com Apollo.

### Por que PostGIS?

Porque rotas são dados espaciais e devem ser armazenadas como tal.

### Por que Repository Pattern?

Para isolar persistência e evitar SQL em services.

### Por que Gateway?

Para isolar Google Maps e facilitar troca futura de provedor.

### Como o JWT protege as rotas?

O frontend envia Bearer Token e o backend valida via GqlAuthGuard.

### Como garantir que um usuário veja apenas suas rotas?

Todas as queries usam userId extraído do token.

---

## 9. Encerramento

Destacar:

- requisitos obrigatórios atendidos;
- diferenciais implementados;
- arquitetura clara;
- possibilidade de evolução.
