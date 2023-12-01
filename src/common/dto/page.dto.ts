import { ApiProperty } from '@nestjs/swagger';

export class PageResponseDto<T> {
  @ApiProperty({ example: [], description: '조회한 데이터' })
  content: T;

  @ApiProperty({ example: 1, description: '현재 페이지' })
  page: number;

  @ApiProperty({ example: 3, description: '총 페이지' })
  totalPage: number;

  @ApiProperty({ example: 10, description: '한 페이지에 들어갈 데이터 개수' })
  limit: number;
}
