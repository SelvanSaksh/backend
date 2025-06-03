import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CreateRetailerDto } from '../../Stores/dto/create.store.dto';
import { Survey } from '../../survey/entities/Survey.entity';
import { StoreSurvey } from '../../Stores/entities/StoreSurvey.entity';


@Entity('survey_responses')
export class SurveyResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    storeId: number;

    @Column()
    surveyId: number;

    @Column()
    userID: number;

    @OneToMany(() => Answer, answer => answer.surveyResponse, { cascade: true })
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity('answers')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionID: number;

    @Column({ default: "" })
    choosenValue: string;

    @Column({ nullable: true })
    noteText?: string;

    @Column()
    areaId: number;

    @Column('json', { nullable: true })
    imagePaths: { uri: string }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => SurveyResponse, surveyResponse => surveyResponse.answers)
    surveyResponse: SurveyResponse;
}

