import { Body, Controller, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  /** 스토리 생성 */
  @Post()
  async createStory(@Body() createStoryDto: CreateStoryDto) {
    return await this.storyService.createStory(createStoryDto);
  }
}
