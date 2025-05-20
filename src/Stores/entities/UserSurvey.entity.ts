
import { Survey } from "src/survey/entities/Survey.entity";
import { Retailers } from "src/Stores/entities/Retailers.entity";
import { AdminUser } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn , Column , Entity, ManyToOne, JoinColumn} from "typeorm";


@Entity('user_survey')
export class UserSurvey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    survey_id: number;

    @Column()
    store_id: number;

    @Column()
    assign_by:number;

    @Column({type: 'varchar', length: 20 ,comment: 'active , inactive'})
    status:string;
    
    @Column({type: 'datetime'})
    datetime:Date;
    
    @ManyToOne(() => AdminUser, (adminUser) => adminUser.id)
    @JoinColumn({ name: 'user_id' })
    adminUser: AdminUser;

    @ManyToOne(() => Survey, (survey) => survey.id)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey; 

    @ManyToOne(() => Retailers, (retailer) => retailer.id)
    @JoinColumn({ name: 'store_id' })
    retailer: Retailers;
}   
