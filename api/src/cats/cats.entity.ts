import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
