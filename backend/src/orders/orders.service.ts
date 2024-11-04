import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { FilesService } from 'src/files/files.service';
import { OrderTasks } from './entities/order-tasks.entity';
import { VerifyingOrderDto } from './dto/verifying-order.dto';
import { Client } from 'src/clients/entities/client.entity';
import { PayloadUser, ReqPayloadUser } from 'src/auth/PayloadUser';
import { RoleTypes } from 'src/role/entities/role.entity';
import { ConfirmingOrderDto } from './dto/confirming-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderTasks)
    private readonly orderTasksRepository: Repository<OrderTasks>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private fileServise: FilesService
  ) { }

  async create(createOrderDto: CreateOrderDto, image: Express.Multer.File): Promise<Order> {
    // Сохраняем изображение и получаем ссылку на файл
    const check = await this.fileServise.createFile(image);

    // Парсим поле lessons из строки в массив объектов Lesson
    const parsedLessons = JSON.parse(createOrderDto.lessons);

    // Создаем запись в OrderTasks с массивом уроков
    const newOrderTasks = this.orderTasksRepository.create({
      lessons: parsedLessons,  // сохраняем распарсенные уроки
    });

    // Сохраняем OrderTasks и получаем его идентификатор
    const savedOrderTasks = await this.orderTasksRepository.save(newOrderTasks);

    // Создаем новый заказ и связываем его с сохраненной записью в OrderTasks
    const { price, telegram_user_id, telegram_nickname, fio, group, type, semester, course } = createOrderDto;

    const newOrder = this.orderRepository.create({
      price: parseFloat(price),
      telegram_user_id,
      telegram_nickname,
      fio,
      group,
      semester,
      course,
      orderTasks: savedOrderTasks,  // связываем с сохраненной записью в OrderTasks
      check,
      type
    });

    // Сохраняем Order и возвращаем его
    return await this.orderRepository.save(newOrder);
  }


  async findAll(kek: ReqPayloadUser): Promise<Order[]> {
    const userRole = kek.user.role;

    // console.log(userRole)

    // Если роль ADMIN, возвращаем все заказы
    if (userRole.type === RoleTypes.ADMIN) {
      return await this.orderRepository.find({
        relations: ['client', 'orderTasks'],
      });
    }

    // Если роль MANAGER, фильтруем по семестрам
    if (userRole.type === RoleTypes.MANAGER) {
      if (!userRole.semesters || userRole.semesters.length === 0) {
        throw new HttpException('У пользователя нет доступа к данным семестров', HttpStatus.FORBIDDEN);
      }

      return await this.orderRepository.find({
        where: { semester: In(userRole.semesters) }, // Фильтрация по семестрам пользователя
        relations: ['client', 'orderTasks'],
      });
    }

    throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
  }

  async testsem(kek: ReqPayloadUser) {
    console.log(kek.user.role.type) // Так получить тип роли
    console.log(kek.user.role.semesters) // Так получить семестры
    const userRole = kek.user.role;

    // Если роль ADMIN, возвращаем все заказы
    if (userRole.type === RoleTypes.ADMIN) {
      return await this.orderRepository.find({
        relations: ['client', 'orderTasks'],
      });
    }

    // Если роль MANAGER, фильтруем по семестрам
    if (userRole.type === RoleTypes.MANAGER) {
      if (!userRole.semesters || userRole.semesters.length === 0) {
        throw new HttpException('У пользователя нет доступа к данным семестров', HttpStatus.FORBIDDEN);
      }

      return await this.orderRepository.find({
        where: { semester: In(userRole.semesters) }, // Фильтрация по семестрам пользователя
        relations: ['client', 'orderTasks'],
      });
    }

    throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
  }

  async allFio(kek: ReqPayloadUser): Promise<string[]> {
    console.log(kek.user.role.type)
    const orders = await this.orderRepository.find();
    return orders.map(order => order.fio); // Возвращаем массив только с полем 'fio'
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'orderTasks'],
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

  async verifying(id: number, verifyingOrderDto: VerifyingOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    const client = await this.clientRepository.findOne({ where: { cipher: verifyingOrderDto.cipher } });

    if (!client) {
      throw new NotFoundException(`Client with cipher ${verifyingOrderDto.cipher} not found`);
    }

    order.client = client;
    order.status = OrderStatus.VERIFIED;
    order.verifiedById = verifyingOrderDto.verifiedById;
    order.verifiedByName = verifyingOrderDto.verifiedByName;
    order.verifiedDate = verifyingOrderDto.verifiedDate;

    return await this.orderRepository.save(order);
  }

  async confirming(id: number, confirmingOrderDto: ConfirmingOrderDto) {
    const order = await this.findOne(id);

    order.status = OrderStatus.CONFIRMED;
    order.confirmedById = confirmingOrderDto.confirmedById;
    order.confirmedByName = confirmingOrderDto.confirmedByName;
    order.confirmedDate = confirmingOrderDto.confirmedDate;

    return await this.orderRepository.save(order);
  }


  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
