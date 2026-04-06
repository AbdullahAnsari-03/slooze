import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error('User not found');

    return this.prisma.order.create({
      data: {
        userId: user.id,
        status: 'CREATED',
        country: user.country,
      },
    });
  }

  async placeOrder(userId: string, orderId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  // RBAC check
  if (user.role === 'MEMBER') {
    throw new ForbiddenException('Members cannot place orders');
  }

  const order = await this.prisma.order.findUnique({
  where: { id: orderId },
});

if (!order) throw new Error('Order not found');

// ReBAC check
if (user.role !== 'ADMIN' && user.country !== order.country) {
  throw new Error('Access denied: different country');
}

  return this.prisma.order.update({
    where: { id: orderId },
    data: { status: 'PLACED' },
  });
}

async cancelOrder(userId: string, orderId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  // RBAC check
  if (user.role === 'MEMBER') {
    throw new Error('Members cannot cancel orders');
  }

  const order = await this.prisma.order.findUnique({
  where: { id: orderId },
});

if (!order) throw new Error('Order not found');

if (user.role !== 'ADMIN' && user.country !== order.country) {
  throw new Error('Access denied: different country');
}

  return this.prisma.order.update({
    where: { id: orderId },
    data: { status: 'CANCELLED' },
  });
}

async updatePayment(userId: string, orderId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  // RBAC check
  if (user.role !== 'ADMIN') {
    throw new Error('Only Admin can update payment');
  }

const order = await this.prisma.order.findUnique({
  where: { id: orderId },
});

if (!order) throw new Error('Order not found');

if (user.role !== 'ADMIN' && user.country !== order.country) {
  throw new Error('Access denied: different country');
}

  return this.prisma.order.update({
    where: { id: orderId },
    data: { status: 'PAYMENT_UPDATED' },
  });
}

async getOrders(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  if (user.role === 'ADMIN') {
    return this.prisma.order.findMany();
  }

  return this.prisma.order.findMany({
    where: { country: user.country },
  });
}
}