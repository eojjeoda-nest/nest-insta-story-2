import { Injectable } from '@nestjs/common';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/utils/pagination.util';
import { take } from 'rxjs';
import { Hashtag } from '../hashtag/entity/hashtag.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(Hashtag)
    private hashtagRepository: Repository<Hashtag>,
  ) {}

  async createStory(dto: CreateStoryRequestDto): Promise<CreateStoryResponseDto> {
    const uniqueHashtags = [...new Set(dto.hashtags)].filter(tag => tag.startsWith('#'));

    const hashtags = await Promise.all(uniqueHashtags.map(async tag => {
      let hashtag = await this.hashtagRepository.findOne({ where: { hashtag: tag }});
      if(!hashtag) {
        hashtag = this.hashtagRepository.create({ hashtag: tag });
        await this.hashtagRepository.save(hashtag);
      }
      return hashtag;
    }));
    const entity = this.storyRepository.create({
      ...dto,
      hashtags,
    });
    await this.storyRepository.save(entity);

    return CreateStoryResponseDto.fromEntity(entity);
  }

  async getStories(dto: PaginationDto): Promise<PaginationResult<CreateStoryResponseDto>> {
    const currentDate = new Date();

    const [results, total] = await this.storyRepository
      .createQueryBuilder("story")
      .leftJoinAndSelect("story.hashtags", "hashtag")
      .where("story.createdAt > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL story.validTime HOUR)")
      .skip((dto.page - 1) * dto.limit)
      .take(dto.limit)
      .getManyAndCount()

    const data = results.map(story => CreateStoryResponseDto.fromEntity(story));

    return createPaginationResult(data, dto.page, dto.limit, total);
  }
}
