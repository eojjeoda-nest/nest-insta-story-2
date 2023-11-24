import { Controller, Post, Body } from '@nestjs/common';
import { StoriesService } from '../service/stories.service';
import { CreateStoryRequestDto } from '../dto/request.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateStoryResponseDto } from '../dto/response.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateStoryResponseDto })
  create(@Body() createStoryRequestDto: CreateStoryRequestDto) {
    return this.storiesService.create(createStoryRequestDto);
  }
}
