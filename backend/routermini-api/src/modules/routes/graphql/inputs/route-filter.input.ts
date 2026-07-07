import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RouteFilterInput {
  @Field({ nullable: true })
  vehiclePlate?: string;

  @Field({ nullable: true })
  originAddress?: string;

  @Field({ nullable: true })
  destinationAddress?: string;
}