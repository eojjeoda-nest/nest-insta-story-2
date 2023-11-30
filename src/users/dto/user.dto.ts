import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommonDto } from 'src/common/dto/common.dto';

export class UserDto extends CommonDto {
  @ApiProperty({
    example: 1,
    description: '사용자 고유번호',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: '전종훈',
    description: '사용자 이름',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;
}
