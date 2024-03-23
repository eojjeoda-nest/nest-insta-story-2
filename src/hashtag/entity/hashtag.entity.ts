import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Story } from '../../story/entities/story.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashtag: string;

  @ManyToMany(() => Story, (story) => story.hashtags)
  stories: Story[];
}