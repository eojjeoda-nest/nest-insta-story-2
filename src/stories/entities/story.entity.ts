import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashtagEntity } from './hashtag.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class StoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  storyId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  validTime: number;

  @Column({ nullable: true })
  expireAt: Date;

  @ManyToMany(() => HashtagEntity, (hashtag) => hashtag.stories, {
    cascade: true,
  })
  hashtags: HashtagEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  creator: UserEntity;

  constructor(
    title: string,
    author: string,
    image: string,
    validTime: number,
    hashtags: HashtagEntity[],
    creator: UserEntity,
  ) {
    super();
    this.title = title;
    this.author = author;
    this.image = image;
    this.validTime = validTime;
    this.expireAt = this.createExpireAt(validTime);
    this.hashtags = hashtags;
    this.creator = creator;
  }

  createExpireAt(validTime: number) {
    return new Date(Date.now() + validTime * 60 * 60 * 1000);
  }
}
