import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RouteEntity } from '../entities/route.entity';
import { SaveRouteInput } from '../graphql/inputs/save-route.input';

@Injectable()
export class RouteRepository {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async saveRoute(input: SaveRouteInput): Promise<RouteEntity> {
    const lineString = input.points
      .map((point) => `${point.lng} ${point.lat}`)
      .join(',');

    const result = await this.dataSource.query(
      `
      INSERT INTO routes
      (
        "originAddress",
        "destinationAddress",
        "distanceKm",
        "durationText",
        points,
        path
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        ST_GeogFromText($6)
      )
      RETURNING *;
      `,
      [
        input.originAddress,
        input.destinationAddress,
        input.distanceKm,
        input.durationText,
        JSON.stringify(input.points),
        `LINESTRING(${lineString})`,
      ],
    );

    return result[0];
  }
}