import { CreateStoryResponseDto } from './create-story-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReadStoryResponseDto {
  @ApiProperty({ description: '스토리 내용', type: [CreateStoryResponseDto] })
  data: CreateStoryResponseDto[];

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '총 페이지 수' })
  totalPage: number;

  @ApiProperty({ description: '한 페이지에 보여줄 스토리 수' })
  limit: number;
}
