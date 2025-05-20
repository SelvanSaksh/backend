import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { AdminUser } from "./user.entity";
import { Retailers } from "src/Stores/entities/Retailers.entity";

@Entity('user_store')
export class UserStore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminUser, (user) => user.userStores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: AdminUser;

  @ManyToOne(() => Retailers, (retailer) => retailer.userStores, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_id' })
  store: Retailers;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true })
  assigned_by: number;

  @Column({ nullable: true })
  status: string;
}
