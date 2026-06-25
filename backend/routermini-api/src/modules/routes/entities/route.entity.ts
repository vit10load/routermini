import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class RouteEntity {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originAddress: string;

  @Column()
  destinationAddress: string;

  @Column('float')
  distanceKm: number;

  @Column()
  durationText: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  path: string;

  @Column({ type: 'jsonb' })
  points: Array<{
    lat: number;
    lng: number;
  }>;

  @CreateDateColumn()
  createdAt: Date;
}