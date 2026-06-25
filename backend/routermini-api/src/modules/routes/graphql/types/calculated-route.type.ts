import { Field, Float, ObjectType } from '@nestjs/graphql';
import { RoutePointType } from './route-point.type';

@ObjectType()
export class CalculatedRouteType {
  @Field()
  originAddress: string;

  @Field()
  destinationAddress: string;

  @Field(() => Float)
  distanceKm: number;

  @Field()
  durationText: string;

  @Field()
  encodedPolyline: string;

  @Field(() => [RoutePointType])
  points: RoutePointType[];
}