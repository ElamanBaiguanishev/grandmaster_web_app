// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    username: string;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRoles: UserRole[];
}
