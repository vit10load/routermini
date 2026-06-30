# Deployment

## Docker Compose

O projeto utiliza Docker Compose para subir:

- PostgreSQL/PostGIS
- Backend NestJS
- Frontend Vue

---

## Comando principal

```bash
docker compose up --build
```

---

## Serviços

### postgres

Imagem:

```text
postgis/postgis
```

Porta:

```text
5432
```

### backend

Porta:

```text
3000
```

### frontend

Porta:

```text
5173
```

---

## Variáveis

Na raiz:

```env
GOOGLE_MAPS_API_KEY=sua_chave
```

---

## Acesso

```text
Frontend: http://localhost:5173
GraphQL: http://localhost:3000/graphql
```

---

## Produção

Para produção, recomenda-se:

- usar build estático do frontend;
- servir via Nginx;
- remover credenciais hardcoded;
- usar secrets;
- configurar HTTPS;
- usar migrations;
- configurar logs.
