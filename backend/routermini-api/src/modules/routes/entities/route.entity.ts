import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';

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
    sequence: number;
    lat: number;
    lng: number;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: string;

  @Column({ nullable: false })
  vehicleId: string;

  @ManyToOne(() => VehicleEntity)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: VehicleEntity;

}