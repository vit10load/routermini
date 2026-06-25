import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './entities/route.entity';
import { RoutesResolver } from './graphql/resolvers/routes.resolver';
import { RoutesService } from './routes.service';
import { GoogleMapsService } from './gateways/google-maps.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity])],
  providers: [RoutesResolver, RoutesService, GoogleMapsService],
})
export class RoutesModule {}