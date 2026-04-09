import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],   
  providers: [AppService],        
})
export class AppModule {}