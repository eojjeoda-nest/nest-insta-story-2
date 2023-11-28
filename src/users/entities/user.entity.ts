import { BaseEntity } from 'src/common/entities/base.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @OneToMany(() => StoryEntity, (storyEntity) => storyEntity.creator)
  stories: StoryEntity[];

  createUser(userName: string) {
    this.userName = userName;
  }
}
