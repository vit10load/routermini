import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from 'src/modules/routes/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleRepository {

  constructor(@InjectRepository(VehicleEntity) private readonly repository: Repository<VehicleEntity>) {}

  findByPlateAndUser(plate: string, userId: string): Promise<VehicleEntity | null> {
    return this.repository.findOne({
      where: {
        plate,
        userId,
      },
    });
  }

  create(vehicle: Partial<VehicleEntity>): Promise<VehicleEntity> {
    return this.repository.save(this.repository.create(vehicle));
  }
}