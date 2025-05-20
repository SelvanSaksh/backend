import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { UserSurvey } from './UserSurvey.entity';
import { UserStore } from 'src/user/entities/UserStore.entity';
@Entity('retailers')
export class Retailers {
    @PrimaryGeneratedColumn()
    id: number;

    // Retailer Info
    @Column({ nullable: true })
    retailer: string;

    @Column({ unique: true, nullable: true })
    outlet_code: string;

    @Column({ nullable: true })
    area: string;


    @Column({ nullable: true })
    site_status: string;

    @Column({ nullable: true })
    comp_type: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    parent_retailer: number;


    // self referencing 
    @ManyToOne(() => Retailers, (retailer) => retailer.id, { nullable: true })
    @JoinColumn({ name: 'parent_retailer' })
    parent: Retailers;

    @OneToMany(() => Retailers, (retailer) => retailer.parent)
    children: Retailers[];

    // Address
    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    cluster: string;

    @Column({ nullable: true })
    region: string;

    @Column({ nullable: true })
    country_code: string;

    // Media/Logos
    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    qr_logo: string;

    // Geo Location
    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    longitude: number;


    @Column({ type: 'text', nullable: true })
    is_timer: number;

    @Column({ nullable: true })
    secret_key: number;

    // Auto Reporting Config
    @Column({ default: false })
    auto_email_report: boolean;

    @Column({ default: false })
    auto_sms_report: boolean;

    @Column({ default: false })
    auto_whatsapp_report: boolean;

    @Column({ type: 'text', nullable: true })
    email_recepients: string;

    @Column({ type: 'text', nullable: true })
    mobile_distirbution_list: string;

    @Column({ type: 'text', nullable: true })
    whatsapp_recipients: string;

    @Column({ default: false })
    final_report_sms: boolean;

    @Column({ default: false })
    final_report_whatsapp: boolean;

    @Column({ default: false })
    final_report_email: boolean;

    // Compliance Requirements
    @Column({ default: false })
    yes_image_reqd: boolean;

    @Column({ default: false })
    no_image_reqd: boolean;

    @Column({ default: false })
    create_actions_auto_for_nc: boolean;

    // Site and Operational Info
    @Column({ nullable: true })
    size_in_sft: number;

    @Column({ nullable: true })
    no_of_employees: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    monthly_rent: number;

    @Column({ nullable: true })
    scaling_type: string;

    @Column({ nullable: true })
    controller_id: string;

    @Column({ nullable: true })
    wifi_user_name: string;

    @Column({ nullable: true })
    wifi_password: string;

    @Column({ nullable: true })
    display_size_sqft: number;

    @Column({ nullable: true })
    avg_sku: number;

    // User Assignments
    @Column({ type: 'text', nullable: true })
    action_approver_users: string;

    @Column({ nullable: true })
    site_manager: string;

    // Dates
    @Column({ type: 'date', nullable: true })
    creation_date: Date;

    @Column({ type: 'date', nullable: true })
    site_open_date: Date;

    // Location Classification
    @Column({ nullable: true })
    city_type: string;

    @Column({ nullable: true })
    region_location: string;

    @Column({ nullable: true })
    work_permit_qr_img: string;

    // Relation to UserStore
    @OneToMany(() => UserStore, (userStore) => userStore.store)
    userStores: UserStore[];
}
