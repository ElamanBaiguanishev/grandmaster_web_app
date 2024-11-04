import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';

@Injectable()
export class SemestersService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>
  ) { }

  async create(createSemesterDto: CreateSemesterDto) {
    const newSemester = {
      name: createSemesterDto.name,
      course: { id: +createSemesterDto.courseId }
    }

    if (!newSemester) throw new BadRequestException('Somethins went wrong')

    return await this.semesterRepository.save(newSemester);
  }

  async allSemNames(): Promise<string[]> {
    const semesters = await this.semesterRepository.find();
    return semesters.map(semester => semester.name);
  }

  async findAll() {
    return await this.semesterRepository.find({
      relations: [
        'course',
        'groups',
        'groups.lessons',
        'groups.lessons.tasks'
      ],
    });
  }

  async findOne(id: number) {
    const semester = await this.semesterRepository.findOne({
      where: { id },
      relations: ['course', 'groups'],
    });
    if (!semester) {
      throw new NotFoundException(`Semester with id ${id} not found`);
    }
    return semester;
  }

  async update(id: number, updateSemesterDto: UpdateSemesterDto) {
    const semester = await this.findOne(id);

    semester.name = updateSemesterDto.name;
    semester.course.id = updateSemesterDto.courseId;

    return await this.semesterRepository.save(semester);
  }

  async remove(id: number) {
    const semester = await this.findOne(id);
    await this.semesterRepository.remove(semester);
  }
}
