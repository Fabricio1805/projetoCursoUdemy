import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'now()' })
  updatedAt: Date;
}
