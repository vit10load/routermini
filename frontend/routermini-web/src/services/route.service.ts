import { apolloClient } from '../apollo/client';
import { CALCULATE_ROUTE_MUTATION } from '../graphql/mutations/calculateRoute';
import { SAVE_ROUTE_MUTATION } from '../graphql/mutations/saveRoute';
import { ROUTES_QUERY } from '../graphql/queries/routes';
import type {
  CalculateRouteResponse,
  CalculatedRoute,
  RoutesResponse,
  SaveRouteResponse,
} from '../types/route';

export async function calculateRoute(input: {
  originAddress: string;
  destinationAddress: string;
}): Promise<CalculatedRoute> {
  const { data } = await apolloClient.mutate<CalculateRouteResponse>({
    mutation: CALCULATE_ROUTE_MUTATION,
    variables: { input },
  });

  if (!data?.calculateRoute) {
    throw new Error('Não foi possível calcular a rota.');
  }

  return data.calculateRoute;
}

export async function saveRoute(route: CalculatedRoute) {
  const { data } = await apolloClient.mutate<SaveRouteResponse>({
    mutation: SAVE_ROUTE_MUTATION,
    variables: {
      input: {
        originAddress: route.originAddress,
        destinationAddress: route.destinationAddress,
        distanceKm: route.distanceKm,
        durationText: route.durationText,
        points: route.points.map((point) => ({
          sequence: point.sequence,
          lat: point.lat,
          lng: point.lng,
        })),
      },
    },
  });

  if (!data?.saveRoute) {
    throw new Error('Não foi possível salvar a rota.');
  }

  return data.saveRoute;
}

export async function listRoutes() {
  const { data } = await apolloClient.query<RoutesResponse>({
    query: ROUTES_QUERY,
    fetchPolicy: 'network-only',
  });

  return data.routes;
}