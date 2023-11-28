import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CommonDto } from 'src/common/dto/common.dto';

export class UserDto extends CommonDto {
  @ApiProperty({
    example: 1,
    description: '사용자 고유번호',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '전종훈',
    description: '사용자 이름',
  })
  userName: string;
}
