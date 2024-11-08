import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository, Like, ILike } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = {
      cipher: createClientDto.cipher,
      name: createClientDto.name,
      group: createClientDto.group,
      client: { id: createClientDto.semesterId }
    }

    if (!newClient) throw new BadRequestException('Somethins went wrong')

    return await this.clientRepository.save(newClient);
  }

  async createMany(createClientsDto: CreateClientDto[]): Promise<Client[]> {
    const clients = createClientsDto.map(dto => ({
      cipher: dto.cipher,
      name: dto.name,
      groupName: dto.group,
      semester: { id: 2 }
    }));

    if (!clients.length) throw new BadRequestException('No clients provided');

    return await this.clientRepository.save(clients);
  }

  async searchByFio(fio: string): Promise<Client[]> {
    // Выполняем поиск клиентов, чьи имена содержат введенную строку
    return await this.clientRepository.find({
      where: { name: ILike(`%${fio}%`) }, // Используем LIKE для частичного поиска
      relations: ['orders'], // Загрузка связанных заказов
    });
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ relations: ['orders', 'semester'] });
  }

  async findOne(cipher: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { cipher },
      relations: ['orders'],
    });

    if (!client) {
      throw new NotFoundException(`Client with cipher ${cipher} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    client.name = updateClientDto.name;
    client.groupName = updateClientDto.groupName;

    return await this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
