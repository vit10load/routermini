import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { RoutePointType } from './route-point.type';

@ObjectType()
export class RouteType {
  @Field(() => ID)
  id: string;

  @Field()
  originAddress: string;

  @Field()
  destinationAddress: string;

  @Field(() => Float)
  distanceKm: number;

  @Field()
  durationText: string;

  @Field(() => [RoutePointType])
  points: RoutePointType[];

  @Field()
  createdAt: Date;
}