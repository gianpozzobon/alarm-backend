import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './Users';
import Zones from './Zones';

@Entity('systems')
class Systems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Users, (user: Users) => user.system)
  @JoinColumn({ name: 'id' })
  users: Users[];

  @OneToMany(() => Zones, (zone: Zones) => zone.system)
  @JoinColumn({ name: 'id' })
  zones: Zones[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Systems;
