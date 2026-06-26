import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './graphql/inputs/login.input';
import { AuthPayloadType } from './graphql/types/auth-payload.type';
import { AuthService } from './services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadType)
  login(@Args('input') input: LoginInput): Promise<AuthPayloadType> {
    return this.authService.login(input);
  }
  
}