import { Injectable } from '@nestjs/common';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/utils/pagination.util';
import { take } from 'rxjs';

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
    const currentDate = new Date();

    const [results, total] = await this.storyRepository
      .createQueryBuilder("story")
      .where("story.createdAt > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL story.validTime HOUR)")
      .skip((dto.page - 1) * dto.limit)
      .take(dto.limit)
      .getManyAndCount()

    return createPaginationResult(results, dto.page, dto.limit, total);
  }
}
