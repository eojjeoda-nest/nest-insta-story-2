import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Expiration } from '../../global/common/constants';
import { IsHashtagArray } from '../../global/common/isHashtagArray';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto {
  @ApiProperty({ description: 'title', example: 'title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'imageUrl',
    example:
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'author', example: '작성자' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'hashtags', example: '["#어쩌다", "#Nest"]' })
  @IsHashtagArray({
    message: "모든 해시태그는 '#'으로 시작해야 합니다.",
  })
  @IsNotEmpty()
  hashtags: string[];

  @ApiProperty({ description: 'validTime', example: 12 })
  @IsEnum(Expiration)
  validTime: Expiration;
}
