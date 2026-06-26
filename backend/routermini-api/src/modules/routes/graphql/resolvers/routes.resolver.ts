import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalculateRouteInput } from '../inputs/calculate-route.input';
import { CalculatedRouteType } from '../types/calculated-route.type';
import { SaveRouteInput } from '../inputs/save-route.input';
import { RouteType } from '../types/route.type';
import { RoutesService } from '../../routes.service';
import { ID } from '@nestjs/graphql';

// import guards in routes operations

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver()
export class RoutesResolver {
  constructor(private readonly routesService: RoutesService) {}

  @Query(() => String)
  health(): string {
    return this.routesService.health();
  }

  @Mutation(() => CalculatedRouteType)
  calculateRoute(@Args('input') input: CalculateRouteInput): Promise<CalculatedRouteType> {
    return this.routesService.calculateRoute(input);
  }

  @Mutation(() => RouteType)
  saveRoute(@Args('input') input: SaveRouteInput): Promise<RouteType> {
    return this.routesService.saveRoute(input);
  }

  @Query(() => [RouteType])
  routes(): Promise<RouteType[]> {
    return this.routesService.findAll();
  }

  @Query(() => RouteType, { nullable: true })
  route(@Args('id', { type: () => ID }) id: string): Promise<RouteType | null> {
    return this.routesService.findById(id);
  }

  
}