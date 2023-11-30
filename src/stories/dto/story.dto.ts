import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonDto } from 'src/common/dto/common.dto';

export class StoryDto extends CommonDto {
  @ApiProperty({
    example: 1,
    description: '스토리 아이디',
  })
  @IsNotEmpty()
  @IsNumber()
  storyId: number;

  @ApiProperty({
    example: '어쩌다 어쩌다',
    description: '스토리 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '전종훈',
    description: '작성자',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '스토리 이미지',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 24,
    description: '스토리 유효시간',
  })
  @IsNotEmpty()
  @IsNumber()
  validTime: number;

  @ApiProperty({
    example: '유효기간',
    description: '스토리 유효기간',
  })
  @IsNotEmpty()
  expireAt: Date;

  @ApiProperty({
    example: ['#어쩌다', '#Nest', '#당근'],
    description: '해시태그',
  })
  @IsNotEmpty()
  // 이거 왜 안먹지? 배열로 받는거
  @IsString({ each: true })
  hashtags: string[];
}
