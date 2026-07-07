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
        <input v-model="searchTerm" type="text" placeholder="Buscar por placa do veículo..."
          @keyup.enter="loadRoutes" />

        <button type="button" @click="loadRoutes">
          Buscar
        </button>

        <p v-if="loading">Carregando rotas...</p>

        <p v-else-if="!filteredRoutes.length" class="subtitle">
          Nenhuma rota encontrada.
        </p>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button v-for="route in filteredRoutes" :key="route.id" type="button" class="route-list-item"
          :class="{ active: selectedRoute?.id === route.id }" @click="selectRoute(route)">
          <strong>{{ route.originAddress }}</strong>
          <span>→ {{ route.destinationAddress }}</span>
          <small>{{ route.distanceKm }} km • {{ route.durationText }}</small>

          <small v-if="route.vehicle">
            {{ route.vehicle.plate }} • {{ route.vehicle.brand }} {{ route.vehicle.model }}
          </small>
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

          <div class="detail-grid" v-if="selectedRoute?.vehicle">
            <div>
              <span>Veículo</span>
              <strong>
                {{ selectedRoute.vehicle.plate }}
              </strong>
            </div>

            <div>
              <span>Marca</span>
              <strong>{{ selectedRoute.vehicle.brand }}</strong>
            </div>

            <div>
              <span>Modelo</span>
              <strong>{{ selectedRoute.vehicle.model }}</strong>
            </div>

          </div>

        </div>

        <RouteMap :points="selectedRoute?.points ?? []" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import RouteMap from '../components/route/RouteMap.vue';
  import { listRoutes } from '../services/route.service';
  import type { SavedRoute } from '../types/route';

  const selectedRoute = ref<SavedRoute | null>(null);
  const routes = ref<SavedRoute[]>([]);
  const searchTerm = ref('');
  const loading = ref(false);
  const errorMessage = ref('');

  const filteredRoutes = computed(() => routes.value);

  function selectFirstAvailableRoute() {
    selectedRoute.value = filteredRoutes.value[0] ?? null;
  }

  async function loadRoutes() {
    try {
      loading.value = true;
      errorMessage.value = '';

      routes.value = await listRoutes({
        search: searchTerm.value.trim() || undefined,
      });

      selectFirstAvailableRoute();

    } catch {
      errorMessage.value = 'Não foi possível carregar as rotas salvas.';
    } finally {
      loading.value = false;
    }
}

  function selectRoute(route: SavedRoute) {
    selectedRoute.value = route;
  }

  onMounted(loadRoutes);

  watch(searchTerm, () => {
    
    const selectedExists = filteredRoutes.value.some(
      (route) => route.id === selectedRoute.value?.id,
    );

    if (!selectedExists) {
      selectFirstAvailableRoute();
    }
  });

</script>