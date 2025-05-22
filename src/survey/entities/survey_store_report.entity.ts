import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Survey } from "src/survey/entities/Survey.entity";
import { Retailers } from "src/Stores/entities/Retailers.entity";
import { SurveyQuery } from "src/survey/entities/SurveyQuery.entity";
import { AdminUser } from "src/user/entities/user.entity";

@Entity('survey_store_report')
export class survey_store_report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    survey_id: number;

    @Column()
    store_id: number;

    @Column({ nullable: true })
    unique_id: number;

    @Column({ nullable: true })
    query_id: number;

    @Column()
    user_id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    reporting_date: Date;

    @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
    rating_scale: number

    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
    reviewer_rating: number;

    @Column({ type: 'varchar', length: 75, nullable: true })
    choosenvalue: string;
 

    @Column({ type: 'varchar', length: 100, nullable: true })
    reviewer_yesnona: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    reviewer_remarks: string;

    @Column({ type: 'varchar', length: 1000, nullable: true })
    survey_images: string;

    @Column({ type: 'int', default: 0 })
    status: number; // 0 for open, 1 for freeze

    @Column({ type: 'int', default: 0 })
    mark_completed: number; // 0-Incomplete, 1-Completed

    @Column({ type: 'int', default: 0, nullable: true })
    final_report_email_web: number;

    @Column({ type: 'date', nullable: true })
    final_report_submit_date: string;

    @Column({ type: 'int', nullable: true })
    final_submit_user_id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    completion_datetime: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    short_response: string;

    @Column({ type: 'varchar', length: 5000, nullable: true })
    report_desc: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    notes: string;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longi: number;

    @Column({ type: 'datetime', nullable: true })
    mobile_start_date_time: Date;

    @Column({ type: 'datetime', nullable: true })
    mobile_end_date_time: Date;

    @Column()
    department: number;
    
    @Column()
    editor_usr_id: number;


    @ManyToOne(() => Survey, (survey) => survey.id)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;

    @ManyToOne(() => Retailers, (retailer) => retailer.id)
    @JoinColumn({ name: 'store_id' })
    store: Retailers;

    @ManyToOne(() => SurveyQuery, (surveyQuery) => surveyQuery.id)
    @JoinColumn({ name: 'query_id' })
    surveyQuery: SurveyQuery;

    @ManyToOne(() => AdminUser, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: AdminUser;

}
