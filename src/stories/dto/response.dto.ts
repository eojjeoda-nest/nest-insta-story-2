import { PickType } from '@nestjs/swagger';
import { StoryDto } from './story.dto';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateStoryResponseDto extends PickType(StoryDto, [
  'storyId',
  'createdAt',
  'validTime',
  'title',
  'author',
  'image',
  'hashtags',
] as const) {}

export class getStoryPaginationResponseDto extends PageDto<
  CreateStoryResponseDto[]
> {}
