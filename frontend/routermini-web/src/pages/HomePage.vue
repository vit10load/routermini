<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">RouterMini</p>
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

          <button type="button" class="secondary-button">
            Salvar rota
          </button>
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
import { useMutation } from '@vue/apollo-composable';
import RouteMap from '../components/route/RouteMap.vue';
import { CALCULATE_ROUTE_MUTATION } from '../graphql/mutations/calculateRoute';
import type { CalculatedRoute, CalculateRouteResponse } from '../types/route';

const originAddress = ref('');
const destinationAddress = ref('');
const calculatedRoute = ref<CalculatedRoute | null>(null);
const errorMessage = ref('');

const { mutate, loading } = useMutation<CalculateRouteResponse>(
  CALCULATE_ROUTE_MUTATION,
);

const canCalculate = computed(
  () => originAddress.value.trim() && destinationAddress.value.trim(),
);

async function calculateRoute() {
  errorMessage.value = '';
  calculatedRoute.value = null;

  if (!canCalculate.value) {
    errorMessage.value = 'Informe o endereço de coleta e entrega.';
    return;
  }

  const result = await mutate({
    input: {
      originAddress: originAddress.value,
      destinationAddress: destinationAddress.value,
    },
  });

  if (result?.data?.calculateRoute) {
    calculatedRoute.value = result.data.calculateRoute;
  }
}
</script>