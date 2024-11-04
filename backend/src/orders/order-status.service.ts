import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OrderStatusService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    // Запуск проверки статусов заказов каждый день в полночь
    @Cron('00 00 * * *', {
        timeZone: 'Asia/Omsk',  // Указание таймзоны Омска
    })
    async handleCron() {
        // console.log('Эта задача выполняется каждый день в 16:00 по Омскому времени');
        await this.updateOrderStatuses();
    }

    async updateOrderStatuses() {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const pendingOrders = await this.orderRepository.find({
            where: {
                status: OrderStatus.NEW,
                createdAt: LessThan(threeDaysAgo),
            },
        });

        for (const order of pendingOrders) {
            order.status = OrderStatus.PENDING;
            await this.orderRepository.save(order);
        }
    }
}
