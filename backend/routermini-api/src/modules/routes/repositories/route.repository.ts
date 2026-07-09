import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RouteEntity } from '../entities/route.entity';
import { SaveRouteInput } from '../graphql/inputs/save-route.input';
import { RouteFilterInput } from '../graphql/inputs/route-filter.input';

@Injectable()
export class RouteRepository {
  
  constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>,
    private readonly dataSource: DataSource,
  ) { }

  async saveRoute(input: SaveRouteInput, userId: string, vehicleId: string): Promise<RouteEntity> {

    const orderedPoints = input.points
      .sort((a, b) => a.sequence - b.sequence);

    const lineString = orderedPoints
      .map((point) => `${point.lng} ${point.lat}`)
      .join(',');

    const result = await this.dataSource.query(
      `
        INSERT INTO routes ( "userId", "vehicleId", "originAddress", "destinationAddress", "distanceKm", "durationText", points, path ) VALUES ( $1, $2, $3, $4, $5, $6, $7, ST_GeogFromText($8) ) RETURNING *;
        `,
      [
        userId,
        vehicleId,
        input.originAddress,
        input.destinationAddress,
        input.distanceKm,
        input.durationText,
        JSON.stringify(orderedPoints),
        `LINESTRING(${lineString})`,
      ],
    );

    return this.repository.findOneOrFail({
      where: {
        id: result[0].id,
      },
      relations: {
        vehicle: true,
      },
    });

  }

  async findAll(userId: string, filter?: RouteFilterInput): Promise<RouteEntity[]> {

    const query = this.repository
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.vehicle', 'vehicle')
      .where('route.userId = :userId', { userId })
      .orderBy('route.createdAt', 'DESC');

    if (filter?.search?.trim()) {

      const search = `%${filter.search.trim().toUpperCase()}%`;

      query.andWhere(
        `
        UPPER(vehicle.plate) LIKE :search
        OR UPPER(route.originAddress) LIKE :search
        OR UPPER(route.destinationAddress) LIKE :search
      `,
        {
          search,
        },
      );
    }

    return query.getMany();
  }

  async findById(id: string, userId: string): Promise<RouteEntity | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

}