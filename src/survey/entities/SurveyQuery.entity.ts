import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "./Survey.entity";
import { AuditQuestions } from "src/audit/entities/AuditQuestions.entity";
import { AuditAreas } from "src/audit/entities/AuditAreas.entity";


@Entity('survey_query')
export class SurveyQuery 
{
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    survey_id: number;

    @Column({ type: 'varchar', length: 500 })
    survey_query: string;

    @Column({ type: 'int' })
    audit_question_id: number;

    @Column({ type: 'varchar', length: 500, nullable: true })
    query_notes: string;

    @Column({ type: 'varchar', length: 25 })
    type: string;

    @Column({ type: 'datetime' })
    up_date: Date;  
    

    @Column({ type: 'int' })
    area: number;


    @Column({ type: 'int' , nullable: true })
    mark: number;

    @Column({ type: 'int' , nullable: true })
    tag1: number;

    @Column({ type: 'int' , nullable: true })
    sequence: number;   

    @Column({ type: 'varchar', length: 1, nullable: true ,default: 'P' })
    yes_image: string;

    @Column({ type: 'varchar', length: 1, nullable: true ,default: 'P' })
    no_image: string;


    @Column({ type: 'varchar', length: 3 ,default: 'No' })
    mandatory: string;

    @Column({ type: 'varchar', length: 20 ,comment: 'Yes, No , on_no , on_yes', nullable: true })
    create_action: string;

    @Column({ type: 'varchar', length: 10 ,default: 'No' ,comment: 'yes or no if yes then this willnot be visible in mobile app', nullable: true })
    multi_observation :string;


    @ManyToOne(() => AuditAreas, (auditArea) => auditArea.id)    
    @JoinColumn({ name: 'area' })
    auditArea: AuditAreas;
    
    
    
    @ManyToOne(() => AuditQuestions, (auditQuestion) => auditQuestion.question_id)
    @JoinColumn({ name: 'audit_question_id' })
    auditQuestion: AuditQuestions;  

    @ManyToOne(() => Survey, (survey) => survey.id)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;
}
