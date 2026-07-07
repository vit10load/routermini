import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
  @Field(() => ID)
  id: string;

  @Field()
  plate: string;

  @Field()
  brand: string;

  @Field()
  model: string;
}