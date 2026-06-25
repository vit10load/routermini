import { Field, Float, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoutePointType } from '../types/route-point.type';

@InputType()
export class SaveRouteInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  originAddress: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  destinationAddress: string;

  @Field(() => Float)
  @IsNumber()
  distanceKm: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  durationText: string;

  @Field(() => [RoutePointInput])
  @IsArray()
  points: RoutePointInput[];
}

@InputType()
export class RoutePointInput {
  @Field()
  @IsNumber()
  sequence: number;

  @Field(() => Float)
  @IsNumber()
  lat: number;

  @Field(() => Float)
  @IsNumber()
  lng: number;
}