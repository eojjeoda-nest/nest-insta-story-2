import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hashtag } from '../../hashtag/entity/hashtag.entity';

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

  @ManyToMany(() => Hashtag)
  @JoinTable()
  hashtags: Hashtag[];
}