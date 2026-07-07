import { CalculateRouteInput } from '../inputs/calculate-route.input';
import { CalculatedRouteType } from '../types/calculated-route.type';
import { SaveRouteInput } from '../inputs/save-route.input';
import { RouteType } from '../types/route.type';
import { RoutesService } from '../../routes.service';

// import guards in routes operations
import { UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../../auth/guards/gql-auth.guard';
import { RouteFilterInput } from '../inputs/route-filter.input';

@UseGuards(GqlAuthGuard)
@Resolver()
export class RoutesResolver {
  constructor(private readonly routesService: RoutesService) { }

  @Query(() => String)
  health(): string {
    return this.routesService.health();
  }

  @Mutation(() => CalculatedRouteType)
  calculateRoute(@Args('input') input: CalculateRouteInput): Promise<CalculatedRouteType> {
    return this.routesService.calculateRoute(input);
  }

  @Mutation(() => RouteType)
  saveRoute(@Args('input') input: SaveRouteInput, @Context() context: { req: { user: { userId: string } } }): Promise<RouteType> {
    console.log('saveRoute input:', input);
    console.log('saveRoute userId:', context.req.user.userId);
    return this.routesService.saveRoute(input, context.req.user.userId);
  }

  @Query(() => [RouteType])
  routes(@Context() context: { req: { user: { userId: string } } }, @Args('filter', { nullable: true }) filter?: RouteFilterInput): Promise<RouteType[]> {
    return this.routesService.findAll(context.req.user.userId, filter);
  }

  @Query(() => RouteType, { nullable: true })
  route(@Args('id', { type: () => ID }) id: string, @Context() context: { req: { user: { userId: string } } }): Promise<RouteType | null> {
    return this.routesService.findById(id, context.req.user.userId);
  }


}