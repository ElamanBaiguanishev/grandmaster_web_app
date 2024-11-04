import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';


@Entity('order_tasks')
export class OrderTasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('jsonb')
    lessons: Lesson[];
}