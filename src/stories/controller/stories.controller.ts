import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { StoriesService } from '../service/stories.service';
import { CreateStoryRequestDto } from '../dto/request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoryResponseDto } from '../dto/response.dto';

@ApiTags('Story')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @ApiOperation({ summary: '스토리 생성' })
  @ApiCreatedResponse({ type: CreateStoryResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createStoryRequestDto: CreateStoryRequestDto) {
    return this.storiesService.create(createStoryRequestDto);
  }

  //pagenation
  @ApiOperation({ summary: '스토리 페이지네이션 조회' })
  @Get('/page')
  getPage(@Query('page') page: number, @Query('limit') limit: number) {
    return this.storiesService.getPage(page, limit);
  }
}
