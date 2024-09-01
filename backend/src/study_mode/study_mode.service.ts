import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyModeDto } from './dto/create-study_mode.dto';
import { UpdateStudyModeDto } from './dto/update-study_mode.dto';
import { StudyMode } from './entities/study_mode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudyModeService {
  constructor(
    @InjectRepository(StudyMode)
    private readonly studyModeRepository: Repository<StudyMode>,
  ) { }

  async create(createStudyModeDto: CreateStudyModeDto): Promise<StudyMode> {
    const studyMode = this.studyModeRepository.create(createStudyModeDto);
    return await this.studyModeRepository.save(studyMode);
  }

  async findAll(): Promise<StudyMode[]> {
    return await this.studyModeRepository.find({ relations: ['courses'] });
  }

  async findOne(id: number): Promise<StudyMode> {
    const studyMode = await this.studyModeRepository.findOne({ where: { id }, relations: ['courses'] });
    if (!studyMode) {
      throw new NotFoundException(`StudyMode with id ${id} not found`);
    }
    return studyMode;
  }

  async update(id: number, updateStudyModeDto: UpdateStudyModeDto): Promise<StudyMode> {
    const studyMode = await this.findOne(id);
    this.studyModeRepository.merge(studyMode, updateStudyModeDto);
    return await this.studyModeRepository.save(studyMode);
  }

  async remove(id: number): Promise<void> {
    const studyMode = await this.findOne(id);
    await this.studyModeRepository.remove(studyMode);
  }
}
