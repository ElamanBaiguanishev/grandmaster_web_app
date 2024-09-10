import { Group } from 'src/groups/entities/group.entity';
import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Group, group => group.lessons)
    group: Group;

    @OneToMany(() => Task, task => task.lesson)
    tasks: Task[]
}
