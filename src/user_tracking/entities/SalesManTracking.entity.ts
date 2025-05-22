import { AdminUser } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { UserTrackingEnum } from "../enum/user.tracking.enum";  

@Entity('sales_man_tracking')
export class SalesManTracking {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'int'})
    user_id: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    outlet_code: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    outlet_type: string;

    @Column({ type: 'longtext', nullable: true })
    outlet_name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    outlet_license_no: string;

    @Column({ type: 'double', precision: 13, scale: 10, nullable: false })
    latitude: number;

    @Column({ type: 'double', precision: 13, scale: 10, nullable: false })
    longitude: number;

    @Column({ type: 'longtext', nullable: false })
    map_address: string;

    @Column({ type: 'longtext', nullable: true })
    user_modified_address: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    city: string;

    @Column({ type: 'varchar', length: 60, nullable: true })
    state: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    pincode: string;

    @Column({ type: 'longtext', nullable: true })
    location_image: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    contact_person_name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    contact_person_number: string;


    @Column({ type: 'enum', enum: UserTrackingEnum, nullable: true })
    user_tracking_type: UserTrackingEnum;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    date_time: Date;

    @Column({ type: 'int', nullable: true })
    lead_status: number;

    @Column({ type: 'date', nullable: true })
    followup_date: string;

    @Column({ type: 'longtext', nullable: true })
    notes: string;

    @Column({ type: 'int', nullable: false })
    visit_type: number;


    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    kms_covered: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    dist_from_comp: number;

    @Column({ type: 'longtext', nullable: false })
    device_id: string;

    @ManyToOne(() => AdminUser, (user) => user.salesManTracking)
    @JoinColumn({ name: 'user_id' })
    user: AdminUser 

}