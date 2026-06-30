# Storybook

## Objetivo

Storybook será utilizado para documentar visualmente os componentes Vue.

---

## Componentes sugeridos

- AppHeader
- LoginForm
- RegisterForm
- AddressForm
- RouteMap
- RouteMetrics
- SavedRoutesList
- AppButton
- AppInput
- AppCard

---

## Instalação

```bash
cd frontend/routermini-web
npx storybook@latest init
```

---

## Execução

```bash
npm run storybook
```

---

## Benefícios

- Documentação visual.
- Teste isolado de componentes.
- Melhor manutenção.
- Validação de UI.
- Demonstração para avaliadores.

---

## Histórias sugeridas

### AppHeader

- Usuário logado.
- Logout.
- Navegação ativa.

### RouteMap

- Sem pontos.
- Com rota.
- Com origem/destino.

### LoginForm

- Estado inicial.
- Loading.
- Erro.

### SavedRoutesList

- Lista vazia.
- Lista preenchida.
- Filtro ativo.
