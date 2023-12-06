import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from '../../global/common/timeStamp';
import { Hashtag } from '../../hashtag/entity/hashtag.entity';

@Entity()
export class Story extends Timestamp {
  @PrimaryGeneratedColumn('increment', { name: 'story_id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ name: 'imageUrl', type: 'varchar', nullable: false })
  imageUrl: string;

  // 현재 로그인한 유저의 이름을 가져온다고 가정하므로 nickname column 생성
  @Column({ name: 'nickname', type: 'varchar', nullable: false })
  author: string;

  @ManyToMany(() => Hashtag)
  @JoinTable()
  hashtags: Hashtag[];

  @Column({ name: 'validTime', type: 'int', nullable: false })
  validTime: number;

  @Column({ name: 'expirationTime', type: 'timestamp', nullable: false })
  expirationTime: Date;
}
