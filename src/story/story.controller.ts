import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entity/story.entity';
import { StoryPaginationDto } from './dto/story-pagination.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  /** 스토리 생성 */
  @Post()
  @HttpCode(HttpStatus.OK)
  async createStory(@Body() createStoryDto: CreateStoryDto) {
    return await this.storyService.createStory(createStoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getRecentStories(
    @Query() storyPaginationDto: StoryPaginationDto,
  ): Promise<Story[]> {
    return this.storyService.findStories(storyPaginationDto);
  }
}
