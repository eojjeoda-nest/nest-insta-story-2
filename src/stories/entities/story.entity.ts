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
}
