import { PickType } from '@nestjs/swagger';
import { StoryDto } from './story.dto';

export class CreateStoryResponseDto extends PickType(StoryDto, [
  'storyId',
  'createdAt',
  'validTime',
  'title',
  'author',
  'image',
  'hashtags',
] as const) {}
