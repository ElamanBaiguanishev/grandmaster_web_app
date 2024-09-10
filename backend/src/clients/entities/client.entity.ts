import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Order } from 'src/orders/entities/order.entity';  // Импорт Order

@Entity('clients')
export class Client {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Group, group => group.clients)
    group: Group;

    @OneToMany(() => Order, order => order.client)
    orders: Order[];
}
