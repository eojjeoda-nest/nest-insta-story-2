import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestStoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'author' })
  readonly author: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'title' })
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'image' })
  readonly image: string;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'hashtags' })
  readonly hashtags: string[];
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'validTime' })
  readonly validTime: number;
}

export class ResponseStoryDto {
  readonly id: number;
  readonly author: string;
  readonly title: string;
  readonly image: string;
  readonly hashtags: string[];
  readonly validTime: number;
  readonly createdAt: Date;
}
