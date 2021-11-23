import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Zones from './Zones';

@Entity('sensors')
class Sensors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  pin: number;

  @Column({ unique: false })
  zoneId: number;

  @ManyToOne(() => Zones, (zone: Zones) => zone.sensors)
  @JoinColumn({ name: 'zoneId' })
  zone: Zones;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Sensors;
