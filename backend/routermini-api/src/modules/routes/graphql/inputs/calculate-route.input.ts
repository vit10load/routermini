import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CalculateRouteInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  originAddress: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  destinationAddress: string;
}