import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateStoryRequestDto {

  @IsInt()
  validTime: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsUrl()
  image: string;

  @IsString({ each: true })
  hashtags: string[];
}