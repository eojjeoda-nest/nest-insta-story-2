import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { RequestStoryDto } from './dto/stories.dto';
import { StoriesMapper } from './mapper/stories.mapper';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    private storiesMapper: StoriesMapper,
  ) {}

  async createStories(req: RequestStoryDto) {
    const story = this.storiesMapper.toEntity(req);
    const result = await this.storyRepository.save(story);
    return this.storiesMapper.toResponseDto(result);
  }
}
