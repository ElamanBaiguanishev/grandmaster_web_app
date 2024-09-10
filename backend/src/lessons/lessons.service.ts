import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>
  ) { }

  async create(createLessonDto: CreateLessonDto) {
    const newLesson = {
      name: createLessonDto.name,
      group: { id: +createLessonDto.groupId }
    }

    if (!newLesson) throw new BadRequestException('Somethins went wrong')

    return await this.lessonRepository.save(newLesson);
  }

  async findAll() {
    return await this.lessonRepository.find();
  }

  async findOne(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['group'],
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
    return lesson;
  }

  async findByGroup(groupId: number): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      where: { group: { id: groupId } },
      // relations: ['semester', 'semester.course', 'semester.course.studyMode']
    });
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.findOne(id);

    lesson.name = updateLessonDto.name;
    lesson.group.id = updateLessonDto.groupId;

    return await this.lessonRepository.save(lesson);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
