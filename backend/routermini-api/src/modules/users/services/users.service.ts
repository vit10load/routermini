import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
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

  async create(input: CreateUserInput) {
    const exists = await this.userRepository.findByEmail(input.email);

    if (exists) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    return this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  
}