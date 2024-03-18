import { Injectable } from '@nestjs/common';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/utils/pagination.util';

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

  async getStories(dto: PaginationDto): Promise<PaginationResult<Story>> {
    const [results, total] = await this.storyRepository.findAndCount({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    return createPaginationResult(results, dto.page, dto.limit, total);
  }
}
