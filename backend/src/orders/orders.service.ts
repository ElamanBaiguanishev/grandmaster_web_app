import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private fileServise: FilesService
  ) { }

  async create(createOrderDto: CreateOrderDto, image: any): Promise<Order> {
    const check = await this.fileServise.createFile(image)

    const { price, telegram_user_id, fio, group_id, lessons } = createOrderDto;

    const newOrder = this.orderRepository.create({
      price: parseFloat(price),
      telegram_user_id,
      fio,
      group_id: parseInt(group_id),
      lessons: JSON.parse(lessons),
      check
    });

    return await this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['client'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    order.price = +updateOrderDto.price;
    // order.check = updateOrderDto.check;

    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
