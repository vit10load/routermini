<template>
  <main class="page">
    <header class="hero">
      <h1>Cálculo, visualização e persistência de rotas</h1>
      <p class="subtitle">
        Informe os endereços de coleta e entrega para calcular a rota via Google Maps.
      </p>
    </header>

    <section class="dashboard">
      <aside class="card sidebar">
        <form class="route-form" @submit.prevent="calculateRoute">
          <label>
            Ponto de coleta
            <input
              v-model="originAddress"
              type="text"
              placeholder="Ex: Campo Grande MS"
            />
          </label>

          <label>
            Ponto de entrega
            <input
              v-model="destinationAddress"
              type="text"
              placeholder="Ex: Aeroporto Internacional de Campo Grande MS"
            />
          </label>

          <button type="submit" :disabled="loading || !canCalculate">
            {{ loading ? 'Calculando...' : 'Calcular rota' }}
          </button>

          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <RouterLink class="secondary-button" to="/routes">
            Ver rotas salvas
        </RouterLink>

        <section v-if="calculatedRoute" class="route-summary">
          <div class="summary-item">
            <span>Distância</span>
            <strong>{{ calculatedRoute.distanceKm }} km</strong>
          </div>

          <div class="summary-item">
            <span>Tempo estimado</span>
            <strong>{{ calculatedRoute.durationText }}</strong>
          </div>

          <div class="summary-item">
            <span>Pontos da rota</span>
            <strong>{{ calculatedRoute.points.length }}</strong>
          </div>

          <button type="button" class="secondary-button" :disabled="saving" @click="saveRoute">
            {{ saving ? 'Salvando...' : 'Salvar rota' }}
          </button>

         <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </section>
      </aside>

      <section class="card map-panel">
        <RouteMap :points="calculatedRoute?.points ?? []" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import RouteMap from '../components/route/RouteMap.vue';
import type { CalculatedRoute } from '../types/route';
import {
  calculateRoute as calculateRouteService,
  saveRoute as saveRouteService,
} from '../services/route.service';

const router = useRouter();

const originAddress = ref('');
const destinationAddress = ref('');
const calculatedRoute = ref<CalculatedRoute | null>(null);
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);
const saving = ref(false);

const canCalculate = computed(
  () => originAddress.value.trim() && destinationAddress.value.trim(),
);

async function calculateRoute() {
  errorMessage.value = '';
  successMessage.value = '';
  calculatedRoute.value = null;

  if (!canCalculate.value) {
    errorMessage.value = 'Informe o endereço de coleta e entrega.';
    return;
  }

  try {
    loading.value = true;

    calculatedRoute.value = await calculateRouteService({
      originAddress: originAddress.value,
      destinationAddress: destinationAddress.value,
    });
  } catch {
    errorMessage.value = 'Não foi possível calcular a rota.';
  } finally {
    loading.value = false;
  }
}

async function saveRoute() {
  if (!calculatedRoute.value) return;

  try {
    saving.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    await saveRouteService(calculatedRoute.value);

    successMessage.value = 'Rota salva com sucesso.';
    router.push('/routes');
  } catch {
    errorMessage.value = 'Não foi possível salvar a rota.';
  } finally {
    saving.value = false;
  }
}
</script>