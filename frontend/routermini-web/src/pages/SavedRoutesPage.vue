<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">RouterMini</p>
      <h1>Rotas salvas</h1>
      <p class="subtitle">Visualize novamente as rotas persistidas no PostGIS.</p>
    </header>

    <section class="saved-layout">
      <aside class="card saved-list">
        <p v-if="loading">Carregando rotas...</p>

        <p v-else-if="!routes.length" class="subtitle">
          Nenhuma rota salva ainda.
        </p>

        <button
          v-for="route in routes"
          :key="route.id"
          type="button"
          class="route-list-item"
          @click="selectedRoute = route"
        >
          <strong>{{ route.originAddress }}</strong>
          <span>→ {{ route.destinationAddress }}</span>
          <small>{{ route.distanceKm }} km • {{ route.durationText }}</small>
        </button>
      </aside>

      <section class="card map-panel">
        <RouteMap :points="selectedRoute?.points ?? []" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import RouteMap from '../components/route/RouteMap.vue';
import { ROUTES_QUERY } from '../graphql/queries/routes';
import type { RoutesResponse, SavedRoute } from '../types/route';

const selectedRoute = ref<SavedRoute | null>(null);

const { result, loading } = useQuery<RoutesResponse>(ROUTES_QUERY);

const routes = computed(() => result.value?.routes ?? []);

watchEffect(() => {
  if (!selectedRoute.value && routes.value.length) {
    selectedRoute.value = routes.value[0];
  }
});
</script>