import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { VehicleEntity } from 'src/modules/routes/entities/vehicle.entity';

@Injectable()
export class VehiclesService {

  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async createOrFind(
    input: {
        plate: string;
        brand: string;
        model: string;
        userId: string;
    }
  ): Promise<VehicleEntity> {
    
    const plate = input.plate.trim().toUpperCase();

    const existingVehicle = await this.vehicleRepository.findByPlateAndUser(
      plate,
      input.userId,
    );

    if (existingVehicle) {
        return existingVehicle;
    }

    return this.vehicleRepository.create({
      userId: input.userId,
      plate,
      brand: input.brand.trim(),
      model: input.model.trim(),
    });

  }
}