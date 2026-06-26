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
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { LOGIN_MUTATION } from '../graphql/mutations/login';
import { saveToken } from '../auth/auth.service';
import type { LoginResponse } from '../types/auth';

const router = useRouter();

const email = ref('admin@routermini.com');
const password = ref('admin123');
const errorMessage = ref('');

const { mutate, loading } = useMutation<LoginResponse>(LOGIN_MUTATION);

async function login() {
  errorMessage.value = '';

  try {
    const result = await mutate({
      input: {
        email: email.value,
        password: password.value,
      },
    });

    const token = result?.data?.login.accessToken;

    if (token) {
      saveToken(token);
      router.push('/');
    }
  } catch {
    errorMessage.value = 'E-mail ou senha inválidos.';
  }
}
</script>