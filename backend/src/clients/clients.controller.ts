import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query, BadRequestException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@UsePipes(ValidationPipe)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Post('bulk')
  async createMany(@Body() createClientsDto: CreateClientDto[]) {
    return this.clientsService.createMany(createClientsDto);
  }

  @Get('search')
  async searchClients(@Query('fio') fio: string): Promise<Client[]> {
    if (!fio) {
      throw new BadRequestException('FIO is required');
    }
    return await this.clientsService.searchByFio(fio);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':cipher')
  findOne(@Param('cipher') cipher: string) {
    return this.clientsService.findOne(cipher);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
