import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from './repositories/vehicle.repository';
import { VehiclesService } from './services/vehicles.service';
import { VehicleEntity } from '../routes/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleRepository, VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}