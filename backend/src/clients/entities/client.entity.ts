import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { SemesterByYear } from 'src/semesters-by-year/entities/semesters-by-year.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cipher: string

    @Column()
    name: string;
    
    @Column()
    groupName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    login: string;

    @Column({ nullable: true })
    password: string;

    @ManyToOne(() => SemesterByYear, semester => semester.clients)
    semester: SemesterByYear;

    @OneToMany(() => Order, order => order.client)
    orders: Order[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
