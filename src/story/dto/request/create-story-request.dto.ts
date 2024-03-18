import { IsInt, IsString, IsUrl, Min } from 'class-validator';
import * as url from 'url';

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