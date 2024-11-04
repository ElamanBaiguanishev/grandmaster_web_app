import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Semester } from 'src/semesters/entities/semester.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Lesson, Group, Semester])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
