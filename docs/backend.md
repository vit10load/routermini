# Backend

## Stack

- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- PostGIS
- JWT
- Passport
- bcrypt

---

## Estrutura

```text
src/
├── database/
├── modules/
│   ├── auth/
│   ├── users/
│   └── routes/
├── app.module.ts
└── main.ts
```

---

## AppModule

Responsável por configurar:

- ConfigModule
- GraphQLModule
- TypeOrmModule
- AuthModule
- UsersModule
- RoutesModule

---

## GraphQL

O backend utiliza GraphQL Code First.

O schema é gerado automaticamente a partir dos decorators.

Exemplo:

```ts
@ObjectType()
export class RouteType {
  @Field(() => ID)
  id: string;
}
```

---

## AuthModule

### Responsabilidades

- Login
- JWT
- Strategy
- Guard
- Proteção GraphQL

### Fluxo

```text
login(input)
  ↓
AuthService
  ↓
UsersService
  ↓
bcrypt.compare
  ↓
JwtService.signAsync
```

---

## GqlAuthGuard

Como GraphQL não usa o mesmo contexto HTTP direto de controllers REST, foi criado um Guard específico para GraphQL.

Ele extrai o request do contexto GraphQL.

```text
ExecutionContext
    ↓
GqlExecutionContext
    ↓
ctx.getContext().req
```

---

## JwtStrategy

A estratégia JWT valida o token e injeta o usuário no request.

Payload:

```text
sub
email
name
```

Request resultante:

```text
req.user.userId
req.user.email
req.user.name
```

---

## UsersModule

### Responsabilidades

- Criar usuário.
- Buscar usuário por e-mail.
- Gerar hash de senha.
- Criar usuário padrão no boot.

### Segurança

Senha nunca é salva em texto puro.

É salvo:

```text
passwordHash
```

gerado com bcrypt.

---

## RoutesModule

### Responsabilidades

- Calcular rota.
- Salvar rota.
- Listar rotas do usuário autenticado.
- Buscar rota por ID.
- Integrar com Google Maps.
- Persistir com PostGIS.

---

## RouteRepository

Centraliza persistência.

Ao salvar a rota, transforma pontos ordenados em:

```text
LINESTRING(lng lat, lng lat, lng lat)
```

E usa:

```sql
ST_GeogFromText(...)
```

para salvar em coluna geography.

---

## Google Maps Gateway

Responsável por consultar Google Maps.

Retorna:

- distância;
- duração;
- polyline;
- pontos ordenados.

---

## Proteção das rotas

O RoutesResolver é protegido com:

```ts
@UseGuards(GqlAuthGuard)
```

Assim as operações de rota exigem JWT.

---

## Isolamento por usuário

Todas as operações de rotas usam `userId`.

```text
WHERE userId = usuário autenticado
```

Isso impede que um usuário visualize rotas de outro.

---

## Melhorias futuras

- Refresh token.
- Roles.
- Testes unitários.
- E2E.
- Logger estruturado.
- Migrations revisadas.
