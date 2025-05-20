
import { Retailers } from "src/Stores/entities/Retailers.entity";

import { Entity ,PrimaryGeneratedColumn ,Column, ManyToOne, JoinColumn } from "typeorm";


@Entity('survey')
export class Survey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    comp_id: number;
  
    @Column({ length: 200 })
    survey_name: string;
  
    @Column({ length: 500, nullable: true })
    description: string;
  
    @Column({ type: 'int' })
    type: number;
  
    @Column({ type: 'int', nullable: true })
    parent_survey_id: number;
  
    @Column({ length: 12, nullable: true })
    frequency: string; // One-Time, Daily, Weekly, Monthly
  
    @Column({ type: 'int', nullable: true })
    day: number;

    @Column({ type: 'time', nullable: true })
    target_time: string;
  
    @Column({ type: 'date', nullable: true })
    created_by: Date;
  
    @Column({ type: 'date', nullable: true })
    up_date: string;
  
    @Column({ length: 20, default: 'Active', nullable: true })
    status: string;

    @ManyToOne(()=> Retailers, (retailer)=> retailer.id)
    @JoinColumn({ name: 'comp_id' })
    retailer: Retailers;

 

}
