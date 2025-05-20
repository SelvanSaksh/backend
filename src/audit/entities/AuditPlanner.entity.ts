import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('audit_planner')
export class AuditPlanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  audit_comp_id: number;

  @Column({ type: 'int' })
  audit_site_id: number;

  @Column({ type: 'int' })
  audit_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  audit_frequency: string;

  @Column({ type: 'datetime' })
  audit_date: Date;

  @Column({ type: 'date', nullable: true })
  actual_date: string;

  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  @Column({ type: 'date', nullable: true })
  audit_last_date: string;

  @Column({ type: 'int' })
  auditor: number;

  @Column({ type: 'int', nullable: true })
  auditee: number;

  @Column({ type: 'int', nullable: true })
  operation_team_id: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  audit_status: string;

  @Column({ type: 'varchar', length: 4, nullable: true, comment: 'Yes,No' })
  allow_after_due_date: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  plan_created_at: Date;

  @Column({ type: 'int', nullable: true, comment: 'multiple user comma separated' })
  editor_usr_ids: number;
}
