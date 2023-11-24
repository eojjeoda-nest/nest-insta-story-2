import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';

export class StoryDto extends BaseDto {
  @ApiProperty({
    example: 1,
    description: '스토리 아이디',
  })
  storyId: number;

  @ApiProperty({
    example: '어쩌다 어쩌다',
    description: '스토리 제목',
  })
  title: string;

  @ApiProperty({
    example: '전종훈',
    description: '작성자',
  })
  author: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '스토리 이미지',
  })
  image: string;

  @ApiProperty({
    example: 24,
    description: '스토리 유효시간',
  })
  validTime: number;

  @ApiProperty({
    example: '유효기간',
    description: '스토리 유효기간',
  })
  expireAt: Date;

  @ApiProperty({
    example: ['#어쩌다', '#Nest', '#당근'],
    description: '해시태그',
  })
  hashtags: string[];
}
