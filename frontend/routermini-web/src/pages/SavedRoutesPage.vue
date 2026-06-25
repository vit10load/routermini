<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">RouterMini</p>
      <h1>Rotas</h1>
      <p class="subtitle">Busque, selecione e visualize novamente rotas persistidas.</p>
      <RouterLink class="secondary-button header-link" to="/">Nova rota</RouterLink>
    </header>

    <section class="saved-layout">
      <aside class="card saved-list">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar por origem ou destino..."
        />

        <p v-if="loading">Carregando rotas...</p>

        <p v-else-if="!filteredRoutes.length" class="subtitle">
          Nenhuma rota encontrada.
        </p>

        <button
          v-for="route in filteredRoutes"
          :key="route.id"
          type="button"
          class="route-list-item"
          :class="{ active: selectedRoute?.id === route.id }"
          @click="selectedRoute = route"
        >
          <strong>{{ route.originAddress }}</strong>
          <span>→ {{ route.destinationAddress }}</span>
          <small>{{ route.distanceKm }} km • {{ route.durationText }}</small>
        </button>
      </aside>

      <section class="card route-detail">
        <div v-if="selectedRoute" class="selected-info">
          <h2>{{ selectedRoute.originAddress }}</h2>
          <p>→ {{ selectedRoute.destinationAddress }}</p>

          <div class="detail-grid">
            <div>
              <span>Distância</span>
              <strong>{{ selectedRoute.distanceKm }} km</strong>
            </div>

            <div>
              <span>Tempo</span>
              <strong>{{ selectedRoute.durationText }}</strong>
            </div>

            <div>
              <span>Pontos</span>
              <strong>{{ selectedRoute.points.length }}</strong>
            </div>
          </div>
        </div>

        <RouteMap :points="selectedRoute?.points ?? []" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useQuery } from '@vue/apollo-composable';
    import RouteMap from '../components/route/RouteMap.vue';
    import { ROUTES_QUERY } from '../graphql/queries/routes';
    import type { RoutesResponse, SavedRoute } from '../types/route';

    const selectedRoute = ref<SavedRoute | null>(null);
    const searchTerm = ref('');

    const { result, loading, refetch } = useQuery<RoutesResponse>(ROUTES_QUERY, null, {
        fetchPolicy: 'network-only',
    },);

    refetch();

    const routes = computed(() => result.value?.routes ?? []);

    const filteredRoutes = computed(() => {
    const term = searchTerm.value.toLowerCase().trim();

    if (!term) return routes.value;

    return routes.value.filter((route) => {
            return (
                route.originAddress.toLowerCase().includes(term) ||
                route.destinationAddress.toLowerCase().includes(term)
            );
        });
    });

    watch(filteredRoutes,(routes) => {

        if (!routes.length) {
            selectedRoute.value = null;
            return;
        }


        const selectedStillExists = routes.some((route) => route.id === selectedRoute.value?.id,);

        if (!selectedRoute.value || !selectedStillExists) {
            selectedRoute.value = routes[0];
        }

    },
   { immediate: true },
);

</script>