import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FilesModule } from 'src/files/files.module';
import { OrderTasks } from './entities/order-tasks.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderStatusService } from './order-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderTasks, Client]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    }),
    FilesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderStatusService],
})
export class OrdersModule { }
