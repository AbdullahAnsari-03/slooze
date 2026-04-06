import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async seedUsers() {
    return this.prisma.user.createMany({
      data: [
        { name: 'Nick Fury', role: 'ADMIN', country: 'INDIA' },
        { name: 'Captain Marvel', role: 'MANAGER', country: 'INDIA' },
        { name: 'Captain America', role: 'MANAGER', country: 'AMERICA' },
        { name: 'Thanos', role: 'MEMBER', country: 'INDIA' },
        { name: 'Thor', role: 'MEMBER', country: 'INDIA' },
        { name: 'Travis', role: 'MEMBER', country: 'AMERICA' },
      ],
    });
  }

  async getUsers() {
  return this.prisma.user.findMany();
}

async getUserById(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
  });
}
}