<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">RouterMini - App</p>
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
    import { useMutation } from '@vue/apollo-composable';
    import RouteMap from '../components/route/RouteMap.vue';
    import { CALCULATE_ROUTE_MUTATION } from '../graphql/mutations/calculateRoute';
    import type { CalculatedRoute, CalculateRouteResponse } from '../types/route';

    import { SAVE_ROUTE_MUTATION } from '../graphql/mutations/saveRoute';
    import type { SaveRouteResponse } from '../types/route';
    import { useRouter } from 'vue-router';

    const originAddress = ref('');
    const destinationAddress = ref('');
    const calculatedRoute = ref<CalculatedRoute | null>(null);
    const errorMessage = ref('');
    const router = useRouter();

    const { mutate: saveRouteMutation, loading: saving } = useMutation<SaveRouteResponse>(SAVE_ROUTE_MUTATION);

    const successMessage = ref('');

    const canCalculate = computed(() => originAddress.value.trim() && destinationAddress.value.trim());

    const { mutate, loading } = useMutation<CalculateRouteResponse>(CALCULATE_ROUTE_MUTATION);

    async function calculateRoute() {

        errorMessage.value = '';
        successMessage.value = '';
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

    async function saveRoute() {
        if (!calculatedRoute.value) return;

        successMessage.value = '';
        errorMessage.value = '';

        const result = await saveRouteMutation({
            input: {
                originAddress: calculatedRoute.value.originAddress,
                destinationAddress: calculatedRoute.value.destinationAddress,
                distanceKm: calculatedRoute.value.distanceKm,
                durationText: calculatedRoute.value.durationText,
                points: calculatedRoute.value.points.map((point) => ({
                    sequence: point.sequence,
                    lat: point.lat,
                    lng: point.lng,
                })),
            },
        });

        if (result?.data?.saveRoute) {
            successMessage.value = 'Rota salva com sucesso.';
            router.push('/routes');
        }
    }
</script>