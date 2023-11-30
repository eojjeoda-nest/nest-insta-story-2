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

  // 이렇게 하면은 setter 동일하다고 볼 수 있기 때문에
  createHashtag(hashtagName: string) {
    this.hashtagName = hashtagName;
  }
}
