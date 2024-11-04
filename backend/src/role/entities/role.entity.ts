// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
// import { RoleTypes } from './role-types.enum'; // Импорт вашего перечисления
export enum RoleTypes {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER'
}

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: RoleTypes, // Используем перечисление RoleTypes
        default: RoleTypes.ADMIN // Значение по умолчанию, если требуется
    })
    type: RoleTypes; // Привязываем к типу enum

    @Column()
    name: string;

    @Column('text', { array: true, nullable: true })
    semesters: string[];

    @OneToMany(() => User, user => user.role)
    users: User[];
}

// role-types.enum.ts
