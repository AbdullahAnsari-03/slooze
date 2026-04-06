import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { Args } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  hello() {
    return 'Hello World';
  }

    @Query(() => [User])
    async users() {
    return this.userService.getUsers();
    }

  @Mutation(() => String)
  async seedUsers() {
    await this.userService.seedUsers();
    return 'Users seeded successfully';
  }

 @Mutation(() => String)
async testRBAC(@Args('userId') userId: string) {
  const user = await this.userService.getUserById(userId);

  if (!user) return 'User not found';

  if (user.role === 'ADMIN') {
    return 'Admin can do everything';
  }

  if (user.role === 'MANAGER') {
    return 'Manager can place & cancel orders';
  }

  if (user.role === 'MEMBER') {
    return 'Member can only create & view orders';
  }

  return 'Invalid role';
}
}