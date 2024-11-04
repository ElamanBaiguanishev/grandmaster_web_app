import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { CreateTaskWithSemesterGroupDto } from './dto/create-withSemesterGroup.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Get('/by-lesson/:lessonId')
  findBySemester(@Param('lessonId') lessonId: string) {
    return this.taskService.findByLesson(+lessonId);
  }

  @Post('by-ids')
  getTasksByIds(@Body('taskIds') taskIds: number[]): Promise<Task[]> {
    return this.taskService.findByIds(taskIds);
  }

  @Post('many')
  createMany(@Body() createTasksDto: CreateTaskWithSemesterGroupDto[]): Promise<Task[]> {
    return this.taskService.createWithSemesterGroup(createTasksDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
