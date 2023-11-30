import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class StoryPaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  page?: number = 0;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(50)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;
}
