import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { type, price, lessonId } = createTaskDto;

    console.log(createTaskDto)

    const newTask = this.taskRepository.create({
      type,
      price,
      lesson: { id: lessonId }
    });

    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['lesson'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['lesson'],
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async findByLesson(lessonId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { lesson: { id: lessonId } },
      // relations: ['semester', 'semester.course', 'semester.course.studyMode']
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    const { type, price, lessonId } = updateTaskDto;

    task.type = type;
    task.price = price;
    task.lesson.id = lessonId;

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
