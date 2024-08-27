import { Injectable } from '@nestjs/common';
import { CreateStudyModeDto } from './dto/create-study_mode.dto';
import { UpdateStudyModeDto } from './dto/update-study_mode.dto';
import { StudyMode } from './entities/study_mode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudyModeService {
  constructor(
    @InjectRepository(StudyMode)
    private readonly studymodeRepository: Repository<StudyMode>
  ) { }

  async create(createStudyModeDto: CreateStudyModeDto) {
    return await this.studymodeRepository.save(createStudyModeDto)
  }

  findAll() {
    return `This action returns all studyMode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studyMode`;
  }

  update(id: number, updateStudyModeDto: UpdateStudyModeDto) {
    return `This action updates a #${id} studyMode`;
  }

  remove(id: number) {
    return `This action removes a #${id} studyMode`;
  }
}
