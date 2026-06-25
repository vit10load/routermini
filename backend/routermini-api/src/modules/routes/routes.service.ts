import { Injectable } from '@nestjs/common';
import { CalculateRouteInput } from './dto/calculate-route.input';
import { CalculatedRouteType } from './graphql/calculated-route.type';
import { GoogleMapsService } from './services/google-maps.service';

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