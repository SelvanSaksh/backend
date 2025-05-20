
import { PrimaryGeneratedColumn ,Entity ,Column} from "typeorm";

@Entity('code_master')
export class CodeMaster {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 50 })
    value: string;
  
    @Column({ length: 50 })
    type: string;
  
    @Column({ type: 'int', nullable: true })
    sort_sequence: number | null;
}
