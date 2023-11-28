import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Expiration } from '../../global/common/constants';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  hashtags: string;

  @IsEnum(Expiration)
  expirationOption: Expiration;
}
