import { Injectable } from '@nestjs/common';
import { CalculateRouteInput } from '../routes/graphql/inputs/calculate-route.input';
import { CalculatedRouteType } from './graphql/types/calculated-route.type';
import { SaveRouteInput } from './graphql/inputs/save-route.input';
import { RouteType } from './graphql/types/route.type';
import { GoogleMapsGateWay } from '../routes/gateways/google-maps.gateway';
import { RouteRepository } from './repositories/route.repository';

@Injectable()
export class RoutesService {
  constructor(
    private readonly googleMapsGateWay: GoogleMapsGateWay,
    private readonly routeRepository: RouteRepository,
  ) {}

  health(): string {
    return 'RouterMini API Online';
  }

  calculateRoute(input: CalculateRouteInput): Promise<CalculatedRouteType> {
    return this.googleMapsGateWay.calculateRoute(input);
  }

  saveRoute(input: SaveRouteInput): Promise<RouteType> {
    return this.routeRepository.saveRoute(input);
  }

  findAll(): Promise<RouteType[]> {
    return this.routeRepository.findAll();
  }

  findById(id: string): Promise<RouteType | null> {
    return this.routeRepository.findById(id);
  }
}