# Autenticação

## Estratégia

A autenticação do RouterMini utiliza JWT.

---

## Fluxo

```text
Usuário informa credenciais
        ↓
login mutation
        ↓
AuthService
        ↓
UsersService
        ↓
bcrypt.compare
        ↓
JwtService.signAsync
        ↓
accessToken
        ↓
Frontend armazena token
        ↓
Apollo envia Bearer
```

---

## Cadastro

Usuário é persistido com:

- name
- email
- passwordHash
- createdAt

A senha é convertida para hash com bcrypt.

---

## Login

O login valida:

- existência do usuário;
- senha com bcrypt.compare.

---

## JWT Payload

```text
sub
email
name
```

---

## Proteção no backend

As rotas GraphQL são protegidas por:

```ts
@UseGuards(GqlAuthGuard)
```

---

## Proteção no frontend

Vue Router verifica se existe token.

Se não existir, redireciona para:

```text
/auth/login
```

---

## Logout

Remove o token do localStorage e redireciona para login.

---

## Melhorias futuras

- Refresh token.
- Expiração controlada no frontend.
- Revogação de tokens.
- Controle de papéis.
