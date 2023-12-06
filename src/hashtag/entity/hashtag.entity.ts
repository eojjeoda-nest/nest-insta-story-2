import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Story } from '../../story/entity/story.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn('increment', { name: 'hashtag_id' })
  id: number;

  @Column()
  hashtag: string;

  @ManyToMany(() => Story, (story) => story.hashtags)
  stories: Story[];
}
