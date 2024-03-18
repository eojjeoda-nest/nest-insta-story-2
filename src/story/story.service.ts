import { Injectable } from '@nestjs/common';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
  ) {}

  async createStory(dto: CreateStoryRequestDto): Promise<CreateStoryResponseDto> {
    const entity = await this.storyRepository.save(dto);
    return CreateStoryResponseDto.fromEntity(entity);
  }
}
