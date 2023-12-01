import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestStoryDto, ResponseStoryDto } from './dto/stories.dto';
import { CreateStoriesPipe } from './pipe/stories.pipe';

@Controller('api/v1/stories')
@ApiTags('스토리 API')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @ApiOperation({ summary: '스토리 생성 API' })
  @ApiCreatedResponse({
    description: '스토리를 생성한다.',
    type: ResponseStoryDto,
  })
  @UsePipes(CreateStoriesPipe) // hashtags, validTime 검증
  createStories(@Body() req: RequestStoryDto) {
    return this.storiesService.createStories(req);
  }
}
