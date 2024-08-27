import { UserRole } from 'src/user/entities/user-role.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}
