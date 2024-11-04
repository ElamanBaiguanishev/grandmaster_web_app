import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { CreateTaskWithSemesterGroupDto } from './dto/create-withSemesterGroup.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>
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

  async createWithSemesterGroup(createTasksDto: CreateTaskWithSemesterGroupDto[]): Promise<Task[]> {
    const tasks: Task[] = [];

    for (const createTaskDto of createTasksDto) {
      const { group, subject, task_type, price, semesterId } = createTaskDto;

      // Ищем семестр
      const semester = await this.semesterRepository.findOne({ where: { id: semesterId }, relations: ['groups'] });
      if (!semester) {
        throw new NotFoundException(`Semester with id ${semesterId} not found`);
      }

      // Ищем группу в указанном семестре
      const foundGroup = semester.groups.find(g => g.name === group);
      if (!foundGroup) {
        throw new NotFoundException(`Group "${group}" not found in semester with id ${semesterId}`);
      }

      // Ищем урок в группе по названию предмета
      let lesson = await this.lessonRepository.findOne({ where: { name: subject, group: { id: foundGroup.id } } });
      if (!lesson) {
        // Создаем урок, если его нет
        lesson = this.lessonRepository.create({ name: subject, group: foundGroup });
        await this.lessonRepository.save(lesson);
      }

      // Создаем новую задачу
      const newTask = this.taskRepository.create({
        type: task_type,
        price,
        lesson: lesson
      });

      // Сохраняем задачу и добавляем её в массив результатов
      tasks.push(await this.taskRepository.save(newTask));
    }

    // Возвращаем массив созданных задач
    return tasks;
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

  async findByIds(taskIds: number[]): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        id: In(taskIds),
      },
      relations: ['lesson'],  // Загружаем связанные уроки
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
