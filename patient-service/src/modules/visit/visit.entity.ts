import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Note } from '../note/note.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;
  
  @Column()
  visit_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;

  @ManyToOne(() => Patient, (patient) => patient.visits)
  patient: Patient;

  @OneToMany(() => Note, (note) => note.visit)
  notes: Note[];
}
