<template>
  <div>
    <header class="app-header">
      <RouterLink class="brand" to="/">RouterMini</RouterLink>

      <nav class="nav-links">
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
    import { removeToken } from '../auth/auth.service';

    const router = useRouter();

    function logout() {
        removeToken();
        router.replace('/login');
    }
</script>