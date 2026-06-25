<template>
  <main class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">RouterMini</p>
        <h1>Cálculo e visualização de rotas</h1>
        <p class="subtitle">
          Informe o ponto de coleta e entrega para calcular a rota via Google Maps.
        </p>
      </div>
    </section>

    <section class="content">
      <form class="card form-card" @submit.prevent="calculateRoute">
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

      <section class="card map-card">
        <RouteMap :points="calculatedRoute?.points ?? []" />
      </section>

      <section v-if="calculatedRoute" class="metrics">
        <article class="card metric-card">
          <span>Distância</span>
          <strong>{{ calculatedRoute.distanceKm }} km</strong>
        </article>

        <article class="card metric-card">
          <span>Tempo estimado</span>
          <strong>{{ calculatedRoute.durationText }}</strong>
        </article>

        <article class="card metric-card">
          <span>Pontos retornados</span>
          <strong>{{ calculatedRoute.points.length }}</strong>
        </article>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { CALCULATE_ROUTE_MUTATION } from '../graphql/mutations/calculateRoute';
import type { CalculatedRoute, CalculateRouteResponse } from '../types/route';
import RouteMap from '../components/route/RouteMap.vue';

const originAddress = ref('');
const destinationAddress = ref('');
const calculatedRoute = ref<CalculatedRoute | null>(null);
const errorMessage = ref('');

const { mutate, loading } = useMutation<CalculateRouteResponse>(
  CALCULATE_ROUTE_MUTATION,
);

const canCalculate = computed(() => {
  return originAddress.value.trim() && destinationAddress.value.trim();
});

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