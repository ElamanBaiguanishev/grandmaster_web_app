import { Semester } from 'src/semesters/entities/semester.entity';
import { StudyMode } from 'src/study_mode/entities/study_mode.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => StudyMode, group => group.courses)
    studyMode: StudyMode;

    @OneToMany(() => Semester, semester => semester.course)
    semesters: Semester[];
}
