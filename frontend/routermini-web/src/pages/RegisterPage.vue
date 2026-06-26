<template>
  <div>
    <h2>Criar conta</h2>
    <p class="subtitle">Cadastre-se para salvar e visualizar suas rotas.</p>

    <form class="route-form" @submit.prevent="register">
      <label>
        Nome
        <input v-model="name" type="text" placeholder="Seu nome" />
      </label>

      <label>
        E-mail
        <input v-model="email" type="email" placeholder="seu@email.com" />
      </label>

      <label>
        Senha
        <input v-model="password" type="password" placeholder="mínimo 6 caracteres" />
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Criar conta' }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <RouterLink class="auth-link" to="/auth/login">
        Já tenho conta
      </RouterLink>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register as registerService } from '../services/auth.service';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

async function register() {
  errorMessage.value = '';
  successMessage.value = '';

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Preencha todos os campos.';
    return;
  }

  try {
    loading.value = true;

    await registerService({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    successMessage.value = 'Conta criada com sucesso.';
    setTimeout(() => router.replace('auth/login'), 800);
  } catch {
    errorMessage.value = 'Não foi possível criar a conta.';
  } finally {
    loading.value = false;
  }
}
</script>