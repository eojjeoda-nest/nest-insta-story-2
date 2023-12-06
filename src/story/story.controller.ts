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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStoryResponseDto } from './dto/create-story-response.dto';
import { ReadStoryResponseDto } from './dto/read-story-response.dto';

@ApiTags('Story')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  /** 스토리 생성 */
  @ApiOperation({ summary: '스토리 생성' })
  @ApiResponse({
    status: 200,
    description: '스토리 생성 성공',
    type: CreateStoryResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async createStory(
    @Body() createStoryDto: CreateStoryDto,
  ): Promise<CreateStoryResponseDto> {
    return await this.storyService.createStory(createStoryDto);
  }

  /** 스토리 조회 */
  @ApiOperation({ summary: '스토리 조회' })
  @ApiResponse({
    status: 200,
    description: '스토리 조회 성공',
    type: ReadStoryResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getRecentStories(
    @Query() storyPaginationDto: StoryPaginationDto,
  ): Promise<ReadStoryResponseDto> {
    return this.storyService.findStories(storyPaginationDto);
  }
}
