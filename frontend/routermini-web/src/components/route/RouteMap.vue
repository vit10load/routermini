<template>
  <div ref="mapElement" class="route-map"></div>
</template>

<script setup lang="ts">
  import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
  import { onMounted, ref, watch } from 'vue';
  import type { RoutePoint } from '../../types/route';

  const props = defineProps<{
    points: RoutePoint[];
  }>();

  const mapElement = ref<HTMLDivElement | null>(null);

  let map: google.maps.Map | null = null;
  let polyline: google.maps.Polyline | null = null;
  let originMarker: google.maps.Marker | null = null;
  let destinationMarker: google.maps.Marker | null = null;

  async function initMap() {

    setOptions({
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    const { Map } = (await importLibrary('maps')) as google.maps.MapsLibrary;
    await importLibrary('marker');

    map = new Map(mapElement.value as HTMLElement, {
      center: { lat: -20.4697, lng: -54.6201 },
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    drawRoute();
  }

  function clearRoute() {
    polyline?.setMap(null);
    originMarker?.setMap(null);
    destinationMarker?.setMap(null);

    polyline = null;
    originMarker = null;
    destinationMarker = null;
  }

  function drawRoute() {
    if (!map || !props.points.length) return;

    clearRoute();

    const path = props.points.map((point) => ({
      lat: point.lat,
      lng: point.lng,
    }));

    polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeOpacity: 1,
      strokeWeight: 5,
    });

    polyline.setMap(map);

    const bounds = new google.maps.LatLngBounds();
    path.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds);

    originMarker = new google.maps.Marker({
      position: path[0],
      map,
      label: 'A',
      title: 'Ponto de coleta',
    });

    destinationMarker = new google.maps.Marker({
      position: path[path.length - 1],
      map,
      label: 'B',
      title: 'Ponto de entrega',
    });
  }

  onMounted(initMap);

  watch(
    () => props.points,
    () => drawRoute(),
    { deep: true },
  );
</script>

<style scoped>
.route-map {
  width: 100%;
  height: 450px;
  border-radius: 12px;
}
</style>