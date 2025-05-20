import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Retailers } from "./Retailers.entity";
import { Survey } from "src/survey/entities/Survey.entity";


@Entity('store_survey')
export class StoreSurvey  {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    store_id: number;

    @Column()
    survey_id: number;


    @Column()
    assigned_by: number;

    @Column()
    status: string;

    @Column()
    created_at: Date;

    @ManyToOne(()=> Retailers   , (retailer)=> retailer.id)
    @JoinColumn({ name: 'store_id' })
    retailer: Retailers;
    
    
    @ManyToOne(()=> Survey   , (survey)=> survey.id)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;
    
}
