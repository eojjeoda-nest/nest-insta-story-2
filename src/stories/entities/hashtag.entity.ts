import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StoryEntity } from './story.entity';

@Entity()
export class HashtagEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  hashtagId: number;

  @Column()
  hashtagName: string;

  @ManyToMany(() => StoryEntity, (story) => story.hashtags)
  @JoinTable()
  stories: StoryEntity[];

  createHashtag(hashtagName: string) {
    this.hashtagName = hashtagName;
  }
}
