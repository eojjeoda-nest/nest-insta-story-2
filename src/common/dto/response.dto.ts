import { ApiProperty } from '@nestjs/swagger';
import { CreateStoryResponseDto } from 'src/stories/dto/response.dto';
import { CreateUserResponseDto } from 'src/users/dto/response.dto';

export class ApiResponseWithOutDataDto {
  @ApiProperty({ description: '상태 코드' })
  statusCode: number;
  @ApiProperty({
    description: '응답 메시지',
  })
  message: string;
}

export class ApiResponseWithDataDto<
  T extends CreateUserResponseDto | CreateStoryResponseDto,
> extends ApiResponseWithOutDataDto {
  @ApiProperty({
    description: '응답 데이터',
  })
  data: T;
}
