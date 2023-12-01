import { IntersectionType, PickType } from '@nestjs/swagger';
import { StoryDto } from './story.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { PageResponseDto } from 'src/common/dto/page.dto';

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

// export class CreateStoryRequestDto {
//   title: string;
//   author: string;
//   hashtags: string[];
//   image: string;
//   validTime: number;
//   userId: number;
// }

export class getStoryPaginationRequestDto extends PickType(PageResponseDto, [
  'page',
  'limit',
] as const) {}
