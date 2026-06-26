import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly userRepository: UserRepository) {}

  async onModuleInit() {
    const email = 'admin@routermini.com';
    const exists = await this.userRepository.findByEmail(email);

    if (!exists) {
      const passwordHash = await bcrypt.hash('admin123', 10);

      await this.userRepository.create({
        name: 'Administrador',
        email,
        passwordHash,
      });
    }
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}