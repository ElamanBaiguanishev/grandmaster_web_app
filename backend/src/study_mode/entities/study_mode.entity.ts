import { Course } from 'src/courses/entities/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('study_modes')
export class StudyMode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Course, group => group.studyMode)
    courses: Course[];
}
