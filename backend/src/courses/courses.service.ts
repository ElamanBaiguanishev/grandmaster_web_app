import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = {
      name: createCourseDto.name,
      studyMode: { id: +createCourseDto.studyModeId }
    }

    if (!newCourse) throw new BadRequestException('Somethins went wrong')

    return await this.courseRepository.save(newCourse);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['studyMode', 'semesters'] });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['studyMode', 'semesters'],
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    course.name = updateCourseDto.name
    course.studyMode.id = updateCourseDto.studyModeId

    return await this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }
}
