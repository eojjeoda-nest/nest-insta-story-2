import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  Generated,
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

  // TODO: 'increment', 'rowid' 왜 안되는지 확인하기
  @Generated('uuid')
  @Column()
  hashtagIdentifier: string;

  @ManyToMany(() => StoryEntity, (story) => story.hashtags)
  @JoinTable()
  stories: StoryEntity[];

  constructor(hashtagName: string, hashtagIdentifier?: string) {
    super();
    this.hashtagName = hashtagName;
    if (hashtagIdentifier) this.hashtagIdentifier = hashtagIdentifier;
  }

  // 이렇게 하면은 setter 동일하다고 볼 수 있기 때문에
  // createHashtag(hashtagName: string) {
  //   this.hashtagName = hashtagName;
  // }
}
