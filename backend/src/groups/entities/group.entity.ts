import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { Client } from 'src/clients/entities/client.entity'; // Импорт модели Client
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Semester, semester => semester.groups)
    semester: Semester;

    @OneToMany(() => Lesson, lesson => lesson.group)
    lessons: Lesson[];

    @OneToMany(() => Client, client => client.group)
    clients: Client[];
}
