import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Sensors from './Sensors';

import Systems from './Systems';

@Entity('zones')
class Zones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  systemId: number;

  @ManyToOne(() => Systems, (systems: Systems) => systems.zones)
  @JoinColumn({ name: 'systemId' })
  system: Systems;

  @OneToMany(() => Sensors, (sensors: Sensors) => sensors.zone)
  @JoinColumn({ name: 'id' })
  sensors: Sensors[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Zones;
