import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    check: string; // это image

    @Column()
    fio: string;

    @Column()
    telegram_user_id: string

    @Column()
    group_id: number

    @Column('jsonb')
    lessons: Lesson
}
