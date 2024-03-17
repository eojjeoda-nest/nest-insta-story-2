import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  validTime: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image: string;

  @Column('text', { array: true })
  hashtags: string[];
}