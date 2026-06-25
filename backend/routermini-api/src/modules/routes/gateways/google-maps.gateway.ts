import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as polyline from '@mapbox/polyline';
import { CalculateRouteInput } from '../graphql/inputs/calculate-route.input';
import { CalculatedRouteType } from '../graphql/types/calculated-route.type';

@Injectable()
export class GoogleMapsService {
  constructor(private readonly configService: ConfigService) {}

  async calculateRoute(input: CalculateRouteInput): Promise<CalculatedRouteType> {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException('Google Maps API key não configurada.');
    }

    const url = 'https://maps.googleapis.com/maps/api/directions/json';

    const response = await axios.get(url, {
      params: {
        origin: input.originAddress,
        destination: input.destinationAddress,
        mode: 'driving',
        language: 'pt-BR',
        key: apiKey,
      },
    });

    if (response.data.status !== 'OK') {
      throw new InternalServerErrorException(
        `Erro ao consultar Google Maps: ${response.data.status}`,
      );
    }

    const route = response.data.routes[0];
    const leg = route.legs[0];

    const encodedPolyline = route.overview_polyline.points;

    const decodedPoints = polyline.decode(encodedPolyline);

    const points = decodedPoints.map(([lat, lng], index) => ({
      sequence: index + 1,
      lat,
      lng,
    }));

    const distanceKm = Number((leg.distance.value / 1000).toFixed(2));
    const durationText = leg.duration.text;

    return {
      originAddress: input.originAddress,
      destinationAddress: input.destinationAddress,
      distanceKm,
      durationText,
      encodedPolyline,
      points,
    };
  }
}