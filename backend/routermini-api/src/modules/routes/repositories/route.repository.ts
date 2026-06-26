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

  async saveRoute(input: SaveRouteInput, userId: string): Promise<RouteEntity> {

      const orderedPoints = input.points
        .sort((a, b) => a.sequence - b.sequence);

      const lineString = orderedPoints
        .map((point) => `${point.lng} ${point.lat}`)
        .join(',');

      const result = await this.dataSource.query(
        `
        INSERT INTO routes
        (
          "userId",
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
          $6,
          ST_GeogFromText($7)
        )
        RETURNING *;
        `,
        [
          userId,
          input.originAddress,
          input.destinationAddress,
          input.distanceKm,
          input.durationText,
          JSON.stringify(orderedPoints),
          `LINESTRING(${lineString})`,
        ],
      );

    return result[0];
  }

  async findAll(userId: string): Promise<RouteEntity[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<RouteEntity | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

}