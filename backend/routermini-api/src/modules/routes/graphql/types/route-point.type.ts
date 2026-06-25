import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoutePointType {
  @Field(() => Int)
  sequence: number;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}