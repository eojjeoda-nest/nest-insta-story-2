import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('stories')
@ApiTags('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '스토리 생성 API', description: '스토리를 생성합니다.' })
  @ApiBody({ type: CreateStoryRequestDto })
  @ApiResponse({ status: 201, description: '스토리 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createStory(@Body() request: CreateStoryRequestDto) {
    return await this.storyService.createStory(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '스토리 목록 조회 API', description: '스토리 목록을 조회합니다.' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: '페이지 번호' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: '페이지 크기' })
  @ApiResponse({ status: 200, description: '스토리 목록 조회 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async getStories(@Query() request: PaginationDto) {
    return await this.storyService.getStories(request);
  }

}
