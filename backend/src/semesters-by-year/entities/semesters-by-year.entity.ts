import { Client } from 'src/clients/entities/client.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Year } from 'src/year/entities/year.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('semestersByYear')
export class SemesterByYear {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Year, group => group.semesters)
    year: Year;

    @ManyToOne(() => Course, (course) => course.semesters)
    course: Course;

    @OneToMany(() => Client, (client) => client.semester)
    clients: Client[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
