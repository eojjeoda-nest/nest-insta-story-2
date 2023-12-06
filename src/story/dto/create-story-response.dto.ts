import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryResponseDto {
  @ApiProperty({ description: '스토리의 id' })
  id: number;

  @ApiProperty({ description: '스토리의 생성 시간' })
  createdAt: Date;

  @ApiProperty({ description: '스토리의 유효 시간' })
  validTime: number;

  @ApiProperty({ description: '스토리의 제목' })
  title: string;

  @ApiProperty({ description: '스토리의 작성자' })
  author: string;
  @ApiProperty({ description: '스토리의 이미지' })
  image: string;

  @ApiProperty({ description: '스토리의 해시태그' })
  hashtags: string[];
}
