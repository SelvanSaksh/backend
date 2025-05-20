import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('survey_query')
export class SurveyQuery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  survey_id: number;

  @Column({ length: 500 })
  survey_query: string;

  @Column()
  audit_question_id: number;

  @Column({ length: 500, nullable: true })
  query_notes: string;

  @Column({ length: 50 })
  type: string;

  @Column({ type: 'date' })
  up_date: string;

  @Column()
  area: number; // Note: comment: 'query area like warehouse, security...'

  @Column({ nullable: true })
  marks: number;

  @Column({ nullable: true })
  tag1: number;

  @Column({ nullable: true })
  sequence: number;

  @Column({ length: 1, default: 'P', nullable: true })
  yes_image: string;

  @Column({ length: 1, default: 'P', nullable: true })
  no_image: string;

  @Column({ length: 3, default: 'No' })
  mandatory: string;

  @Column({ length: 20, nullable: true })
  create_action: string; // Yes, No, on_no, on_yes

  @Column({ length: 10, default: 'No' })
  multi_observation: string; // yes or no (affects mobile visibility)
}
