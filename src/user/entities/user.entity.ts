import { Role } from "src/common/entities/Role.entity";
import { Retailers } from "src/Stores/entities/Retailers.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserStore } from "./UserStore.entity";
import { SalesManTracking } from "src/user_tracking/entities/SalesManTracking.entity";
@Entity('admin_user')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  @Unique(['email'])
  email: string;

  @Column({ length: 200 })
  user_name: string;

  @Column({ length: 800 })
  pass: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 30, nullable: true })
  contact_num: string;

  @Column({ length: 30, nullable: true })
  mob_num: string;

  @Column({ length: 40 })
  city: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 40 })
  emp_id: string;

  @Column()
  user_role: number;

  @Column({ length: 20, nullable: true })
  full_site_survey_for_dashboard: string;

  @Column({ length: 80, nullable: true })
  tab_num: string;

  @Column({ length: 50, nullable: true })
  tab_version: string;

  @Column({ nullable: true })
  parent_user: number;

  @Column({ type: 'int', width: 6, nullable: true })
  primary_work_site: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({ length: 15, nullable: true })
  status: string;

  @Column({ length: 120, nullable: true })
  region_locations: string;

  @Column({ length: 300, nullable: true })
  selfi: string;

  @Column({ type:'varchar' , length:255 , nullable:true })
  companyName:string;

  @Column({type:"varchar" , length:155 , nullable:true})
  industryType:string


  @Column({type:"varchar" , length:155 , nullable:true})
  jobTitle:string

  @Column({type:'varchar' , length: 55 , nullable:true})
  companySize:string;

  // Relations
  @OneToMany(() => UserStore, (userStore) => userStore.user)
  userStores: UserStore[];

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'user_role' })
  role: Role;

  @ManyToOne(() => Retailers, (retailer) => retailer.id)
  @JoinColumn({ name: 'primary_work_site' })
  company_site: Retailers;


  @OneToMany(() => SalesManTracking, (salesManTracking) => salesManTracking.user)
  salesManTracking: SalesManTracking[];


}