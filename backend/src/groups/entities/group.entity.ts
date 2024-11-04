import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'boolean', default: true })
    isVisible: boolean;

    @ManyToOne(() => Semester, semester => semester.groups)
    semester: Semester;

    @OneToMany(() => Lesson, lesson => lesson.group)
    lessons: Lesson[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
