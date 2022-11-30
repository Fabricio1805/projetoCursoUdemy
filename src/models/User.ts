import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'now()' })
  updatedAt: Date;
}
