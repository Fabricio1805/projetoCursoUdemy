import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'now()' })
  updatedAt: Date;
}
