import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { StoryMapper } from './dto/story.mapper.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Hashtag])],
  providers: [StoryService, StoryMapper],
  controllers: [StoryController],
})
export class StoryModule {}
