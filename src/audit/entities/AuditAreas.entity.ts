import { Survey } from 'src/survey/entities/Survey.entity';
import { Retailers } from 'src/Stores/entities/Retailers.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity('audit_areas')
export class AuditAreas {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'int', nullable: true })
  store_id: number;

  @Column({ type: 'int', nullable: true })
  survey_id: number;

  @Column({ length: 150 })
  area_name: string;

  @Column({ length: 500, nullable: true })
  area_details: string;

  @Column({ type: 'int', default: 0 })
  parent_area_id: number;

  @Column({ type: 'int', nullable: true, comment: '0=no, 1=yes' })
  disable: number;

  @ManyToOne(() => Survey, (survey) => survey.id)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @ManyToOne(() => Retailers, (retailer) => retailer.id)
  @JoinColumn({ name: 'store_id' })
  store: Retailers;
}
