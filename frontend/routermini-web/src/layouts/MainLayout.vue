<template>
  <div class="main-layout">
    <header class="app-header">
      <RouterLink class="brand" to="/">RouterMini - App</RouterLink>
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
        router.replace('/auth/login');
    }

</script>

<style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }

  .brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    align-items: center;
  }

  .nav-links > * {
    margin-left: 1rem;
  }

  .user-greeting {
    font-weight: bold;
  }

  .logout-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .logout-button:hover {
    background-color: #c0392b;
  }

  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>