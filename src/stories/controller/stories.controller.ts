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
import { PageResponseDto } from 'src/common/dto/page.dto';
import { ApiResponseWithDataDto } from 'src/common/dto/response.dto';

@ApiTags('Story')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @ApiOperation({ summary: '스토리 생성' })
  @ApiCreatedResponse({ type: ApiResponseWithDataDto<CreateStoryResponseDto> })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createStoryRequestDto: CreateStoryRequestDto,
  ): Promise<CreateStoryResponseDto> {
    return this.storiesService.create(createStoryRequestDto);
  }

  //pagination
  @ApiOperation({ summary: '스토리 페이지네이션 조회' })
  @ApiCreatedResponse({
    type: ApiResponseWithDataDto<PageResponseDto<CreateStoryResponseDto[]>>,
  })
  @Get('/page')
  getPage(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PageResponseDto<CreateStoryResponseDto[]>> {
    return this.storiesService.getPage(page, limit);
  }
}
