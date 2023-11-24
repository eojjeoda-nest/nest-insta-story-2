import { Module } from '@nestjs/common';
import { StoriesService } from '../service/stories.service';
import { StoriesController } from '../controller/stories.controller';
import { StoryEntity } from '../entities/story.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { HashtagEntity } from '../entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoryEntity, UserEntity, HashtagEntity])],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
