// user-role.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/role/entities/role.entity';

@Entity('user_role')
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userRoles)
    user: User;

    @ManyToOne(() => Role, role => role.userRoles)
    role: Role;
}
