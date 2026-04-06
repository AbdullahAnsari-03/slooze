import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: require('@nestjs/apollo').ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    UserModule,
    OrderModule,
  ],
})
export class AppModule { }