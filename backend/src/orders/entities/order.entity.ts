import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { OrderTasks } from './order-tasks.entity';

export enum OrderStatus {
    NEW = 'NEW',              // Белый: Необработанный - только пришел
    PENDING = 'PENDING',      // Красный: Не обработан больше 3х дней
    VERIFIED = 'VERIFIED',    // Желтый: Обработанный - сверен с базой студентов
    CONFIRMED = 'CONFIRMED'   // Зеленый: Подтвержденный - взят в работу
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @Column()
    price: number;

    @Column()
    check: string;

    @Column()
    fio: string;

    @Column()
    telegram_user_id: string;

    @Column()
    telegram_nickname: string;

    @Column()
    course: string;

    @Column()
    semester: string;

    @Column()
    group: string;

    @Column()
    type: string

    @OneToOne(() => OrderTasks, orderTasks => orderTasks.id, { onDelete: 'SET NULL' })
    @JoinColumn()
    orderTasks: OrderTasks;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.NEW,  // Статус по умолчанию "необработанный"
    })
    status: OrderStatus;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ nullable: true })
    verifiedById: number;

    @Column({ nullable: true })
    verifiedByName: string;

    @Column({ nullable: true })
    verifiedDate: Date;

    @Column({ nullable: true })
    confirmedById: number;

    @Column({ nullable: true })
    confirmedByName: string;

    @Column({ nullable: true })
    confirmedDate: Date;
}
