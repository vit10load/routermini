import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { UserType } from './graphql/types/user.type';
import { UsersService } from './services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  registerUser(@Args('input') input: CreateUserInput): Promise<UserType> {
    return this.usersService.create(input);
  }
  
}