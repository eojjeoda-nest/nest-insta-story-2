import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseWithOutDataDto {
  @ApiProperty({ description: '상태 코드' })
  statusCode: number;
  @ApiProperty({
    description: '응답 메시지',
  })
  message: string;
}

export class ApiResponseWithDataDto<T> extends ApiResponseWithOutDataDto {
  @ApiProperty({
    description: '응답 데이터',
  })
  data: T;
}
