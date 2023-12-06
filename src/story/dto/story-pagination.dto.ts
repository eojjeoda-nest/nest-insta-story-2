import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StoryPaginationDto {
  @ApiProperty({ description: 'page', example: '1', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @ApiProperty({ description: 'limit', example: '10', required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(50)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;
}
