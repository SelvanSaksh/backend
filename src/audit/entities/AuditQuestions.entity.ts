import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AuditAreas } from './AuditAreas.entity';

@Entity('audit_questions')
export class AuditQuestions {
  @PrimaryGeneratedColumn({ type: 'int' })
  question_id: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  question: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  option_types: string;

  @Column({ type: 'int', default: 0 })
  sequence: number;

  @Column({ type: 'int', nullable: true })
  audit_area: number;


  @ManyToOne(() => AuditAreas, (auditArea) => auditArea.id)
  @JoinColumn({ name: 'audit_area' })
  auditArea: AuditAreas;
  
}
