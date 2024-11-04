// semester.entity.ts
import { Course } from 'src/courses/entities/course.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('semesters')
export class Semester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Course, group => group.semesters)
    course: Course;

    @OneToMany(() => Group, group => group.semester)
    groups: Group[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
