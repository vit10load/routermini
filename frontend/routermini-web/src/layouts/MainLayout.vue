<template>
  <div>
    <header class="app-header">
      <RouterLink class="brand" to="/">RouterMini</RouterLink>

      <nav class="nav-links">
        <span class="user-greeting">Olá, {{ user?.name }}</span>
        <RouterLink to="/">Nova rota</RouterLink>
        <RouterLink to="/routes">Rotas salvas</RouterLink>
        <button type="button" class="logout-button" @click="logout">
          Sair
        </button>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { getAuthenticatedUser, removeToken } from '../auth/auth.service';

    const router = useRouter();

    const user = getAuthenticatedUser();

    function logout() {
        removeToken();
        router.replace('/login');
    }

</script>