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

  // TODO: 수현님 코드 참고=> 밀리초 단위의 타임스탬프 데이터를 정확하고 안정적으로 저장하기 위함
  // @Column('bigint')
  // expires: number;
  @Column({ nullable: true })
  expireAt: Date;

  @ManyToMany(() => HashtagEntity, (hashtag) => hashtag.stories, {
    cascade: true,
  })
  hashtags: HashtagEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  creator: UserEntity;

  createStory(
    title: string,
    author: string,
    image: string,
    validTime: number,
    hashtags: HashtagEntity[],
    creator: UserEntity,
  ) {
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
