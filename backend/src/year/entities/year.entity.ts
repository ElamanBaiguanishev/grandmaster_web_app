import { Lesson } from 'src/lessons/entities/lesson.entity';
import { SemesterByYear } from 'src/semesters-by-year/entities/semesters-by-year.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('years')
export class Year {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => SemesterByYear, semesteryear => semesteryear.year)
    semesters: SemesterByYear[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
