import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class VehicleEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  plate: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @CreateDateColumn()
  createdAt: Date;
}