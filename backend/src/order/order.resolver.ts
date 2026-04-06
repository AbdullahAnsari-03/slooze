import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Query } from '@nestjs/graphql';
@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => String)
  async createOrder(@Args('userId') userId: string) {
    await this.orderService.createOrder(userId);
    return 'Order created';
  }

  @Mutation(() => String)
async placeOrder(
  @Args('userId') userId: string,
  @Args('orderId') orderId: string,
) {
  await this.orderService.placeOrder(userId, orderId);
  return 'Order placed';
}

@Query(() => String)
async getOrders(@Args('userId') userId: string) {
  const orders = await this.orderService.getOrders(userId);
  return JSON.stringify(orders);
}

@Mutation(() => String)
async cancelOrder(
  @Args('userId') userId: string,
  @Args('orderId') orderId: string,
) {
  await this.orderService.cancelOrder(userId, orderId);
  return 'Order cancelled';
}

@Mutation(() => String)
async updatePayment(
  @Args('userId') userId: string,
  @Args('orderId') orderId: string,
) {
  await this.orderService.updatePayment(userId, orderId);
  return 'Payment updated';
}
}