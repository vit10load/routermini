import { Injectable } from '@nestjs/common';
import { CalculateRouteInput } from './graphql/inputs/calculate-route.input';
import { CalculatedRouteType } from './graphql/types/calculated-route.type';
import { GoogleMapsService } from './gateways/google-maps.gateway';

@Injectable()
export class RoutesService {

  constructor(private readonly googleMapsService: GoogleMapsService) {

  }

  health(): string {
    return 'RouterMini API Online';
  }

  calculateRoute(input: CalculateRouteInput): Promise<CalculatedRouteType> {
    return this.googleMapsService.calculateRoute(input);
  }
}