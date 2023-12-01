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
  expireAt: Date;
}

export class ResponseStoryDto {
  id: number;
  author: string;
  title: string;
  image: string;
  hashtags: string[];
  validTime: number;
  createdAt: Date;
}
