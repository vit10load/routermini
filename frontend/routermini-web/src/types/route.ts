export interface RoutePoint {
  sequence: number;
  lat: number;
  lng: number;
}

export interface CalculatedRoute {
  originAddress: string;
  destinationAddress: string;
  distanceKm: number;
  durationText: string;
  encodedPolyline: string;
  points: RoutePoint[];
}

export interface CalculateRouteResponse {
  calculateRoute: CalculatedRoute;
}

export interface SavedRoute extends CalculatedRoute {
  id: string;
  createdAt: string;
}

export interface SaveRouteResponse {
  saveRoute: SavedRoute;
}

export interface RoutesResponse {
  routes: SavedRoute[];
}

export interface Vehicle {
  id?: string;
  plate: string;
  brand: string;
  model: string;
}

export interface SaveRouteVehicleInput {
  plate: string;
  brand: string;
  model: string;
}

export interface SavedRoute extends CalculatedRoute {
  id: string;
  createdAt: string;
  vehicle?: Vehicle;
}