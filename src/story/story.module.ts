import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Hashtag])],
  providers: [StoryService],
  controllers: [StoryController],
})
export class StoryModule {}
