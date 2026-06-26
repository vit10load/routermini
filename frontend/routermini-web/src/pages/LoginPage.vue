<template>
  <main class="login-page">
    <section class="login-card">
      <p class="eyebrow">RouterMini</p>
      <h1>Acessar sistema</h1>
      <p class="subtitle">Informe suas credenciais para continuar.</p>

      <form class="route-form" @submit.prevent="login">
        <label>
          E-mail
          <input v-model="email" type="email" placeholder="admin@routermini.com" />
        </label>

        <label>
          Senha
          <input v-model="password" type="password" placeholder="admin123" />
        </label>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="auth-actions">
        <RouterLink class="auth-link" to="/auth/register">
          Ainda não possui uma conta? <strong>Cadastre-se</strong>
        </RouterLink>
      </div>

      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login as loginService } from '../services/auth.service';

const router = useRouter();

const email = ref('admin@routermini.com');
const password = ref('admin123');
const errorMessage = ref('');
const loading = ref(false);

async function login() {
  errorMessage.value = '';

  try {
    loading.value = true;

    await loginService({
      email: email.value,
      password: password.value,
    });

    router.replace('/');
  } catch {
    errorMessage.value = 'E-mail ou senha inválidos.';
  } finally {
    loading.value = false;
  }
}
</script>