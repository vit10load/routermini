import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RouteFilterInput {

  @Field({ nullable: true })
  search?: string;

}