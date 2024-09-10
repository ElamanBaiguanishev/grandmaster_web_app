import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = {
      id: createClientDto.id,
      name: createClientDto.name,
      group: { id: createClientDto.groupId }
    }

    if (!newClient) throw new BadRequestException('Somethins went wrong')

    return await this.clientRepository.save(newClient);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ relations: ['group'] });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['group'],
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    client.name = updateClientDto.name;
    client.group.id = updateClientDto.groupId;

    return await this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
