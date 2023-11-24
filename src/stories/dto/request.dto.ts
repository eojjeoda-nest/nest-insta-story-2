import { IntersectionType, PickType } from '@nestjs/swagger';
import { StoryDto } from './story.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CreateStoryRequestDto extends IntersectionType(
  PickType(StoryDto, [
    'title',
    'author',
    'hashtags',
    'image',
    'validTime',
  ] as const),
  PickType(UserDto, ['userId'] as const),
) {}
