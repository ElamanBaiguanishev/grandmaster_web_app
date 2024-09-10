import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Lesson, lesson => lesson.tasks)
    lesson: Lesson;
}
