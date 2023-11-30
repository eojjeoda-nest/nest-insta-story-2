import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Expiration } from '../../global/common/constants';
import { IsHashtagArray } from '../../global/common/isHashtagArray';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsHashtagArray({
    message: "모든 해시태그는 '#'으로 시작해야 합니다.",
  })
  @IsNotEmpty()
  hashtags: string[];

  @IsEnum(Expiration)
  validTime: Expiration;
}
