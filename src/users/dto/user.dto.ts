import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';

export class UserDto extends BaseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  userId: number;

  @ApiProperty({
    example: '전종훈',
    description: '사용자 이름',
  })
  userName: string;
}
