import { Injectable } from '@nestjs/common';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Year } from './entities/year.entity';

@Injectable()
export class YearService {
  constructor(
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>
  ) { }

  create(createYearDto: CreateYearDto) {
    return 'This action adds a new year';
  }

  async findAll() {
    return await this.yearRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} year`;
  }

  update(id: number, updateYearDto: UpdateYearDto) {
    return `This action updates a #${id} year`;
  }

  remove(id: number) {
    return `This action removes a #${id} year`;
  }
}
