import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty({
    example: '2023-11-21T12:00:00.000Z',
    description: '생성시간',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-11-21T12:00:00.000Z',
    description: '수정시간',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-11-21T12:00:00.000Z',
    description: '삭제시간',
  })
  deletedAt: Date | null;
}
