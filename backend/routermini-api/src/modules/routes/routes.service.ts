import { Injectable } from '@nestjs/common';
import { CalculateRouteInput } from '../routes/graphql/inputs/calculate-route.input';
import { CalculatedRouteType } from './graphql/types/calculated-route.type';
import { SaveRouteInput } from './graphql/inputs/save-route.input';
import { RouteType } from './graphql/types/route.type';
import { GoogleMapsGateWay } from '../routes/gateways/google-maps.gateway';
import { RouteRepository } from './repositories/route.repository';
import { VehiclesService } from '../vehicles/services/vehicles.service';
import { RouteFilterInput } from './graphql/inputs/route-filter.input';

@Injectable()
export class RoutesService {

  constructor(
    private readonly googleMapsGateWay: GoogleMapsGateWay,
    private readonly routeRepository: RouteRepository,
    private readonly vehiclesService: VehiclesService,
  ) {}

  health(): string {
    return 'RouterMini API Online';
  }

  calculateRoute(input: CalculateRouteInput): Promise<CalculatedRouteType> {
    return this.googleMapsGateWay.calculateRoute(input);
  }

  async saveRoute( input: SaveRouteInput, userId: string, ): Promise<RouteType> { 

    const vehicle = await this.vehiclesService.createOrFind(
      { plate: input.vehicle.plate, 
        brand: input.vehicle.brand, 
        model: input.vehicle.model, 
        userId, 
      });
      
    return this.routeRepository.saveRoute( input, userId, vehicle.id); 
  }

  findAll(userId: string, filter?: RouteFilterInput): Promise<RouteType[]> {
    return this.routeRepository.findAll(
      userId,
      filter?.vehiclePlate,
    );
  }

  findById(id: string, userId: string): Promise<RouteType | null> {
    return this.routeRepository.findById(id, userId);
  }
}