import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('user_tokens')
export class UserTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', generated: 'uuid' })
  token: string;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'now()' })
  updatedAt: Date;
}
