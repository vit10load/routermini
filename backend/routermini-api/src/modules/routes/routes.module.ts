import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { RouteRepository } from './repositories/route.repository';
import { RoutesResolver } from './graphql/resolvers/routes.resolver';
import { RoutesService } from './routes.service';
import { GoogleMapsGateWay } from './gateways/google-maps.gateway';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity]), 
    VehiclesModule,
  ],
  providers: [
    RoutesResolver,
    RoutesService,
    GoogleMapsGateWay,
    RouteRepository,
  ],
})
export class RoutesModule {}