
import { AdminUser } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn , Column , Entity, OneToMany} from "typeorm";

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50})
  role_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  sequence: number;  

  @Column({nullable: true})
  comp_id: number;

  @Column({nullable: true})
  level: number;

  @Column({nullable: true})
  parent_role: number;

  @Column()
  region_location:number;

  @Column({nullable: true , comment: 'Redirect to this page after login'})
  default_login_url:string;
  

  @OneToMany(() => AdminUser, (adminUser) => adminUser.role)
  adminUsers: AdminUser[];
}
