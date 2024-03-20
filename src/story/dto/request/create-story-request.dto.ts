import { IsIn, IsInt, IsString, IsUrl, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryRequestDto {

  @IsInt()
  @IsIn([12, 24], {
    message: 'validTime은 12시간 또는 24시간으로 설정 가능합니다.',
  })
  @ApiProperty({
    description: '유효시간은 12시간 또는 24시간으로 설정 가능합니다.',
    example: 12
  })
  validTime: number;

  @IsString()
  @ApiProperty({
    example: '어쩌다 Nest'
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: '어쩌다'
  })
  author: string;

  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/image.jpg'
  })
  image: string;

  @IsString({ each: true })
  @Matches(/#[^\s#]+/g, { each: true, message: '모든 해시태그는 #으로 시작해야 합니다.' })
  @ApiProperty({
    example: ['#어쩌다', '#Nest', '#당근']
  })
  hashtags: string[];
}