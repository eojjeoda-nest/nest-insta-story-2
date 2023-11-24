import { PickType } from '@nestjs/swagger';
import { StoryDto } from './story.dto';

export class CreateStoryRequestDto extends PickType(StoryDto, [
  'title',
  'author',
  'hashtags',
  'image',
  'validTime',
] as const) {
  userId: number;
}
