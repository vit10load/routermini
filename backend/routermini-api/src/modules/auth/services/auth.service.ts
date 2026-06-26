import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../graphql/inputs/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginInput): Promise<{ accessToken: string }> {
    
    const email = this.configService.get<string>('AUTH_USER_EMAIL');
    const password = this.configService.get<string>('AUTH_USER_PASSWORD');

    if (input.email !== email || input.password !== password) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: input.email,
      email: input.email,
    });

    return { accessToken };
  }
}