import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserRequestDto } from '../dto/request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from '../dto/response.dto';
import { ApiResponseWithDataDto } from 'src/common/dto/response.dto';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '사용자 생성' })
  @ApiOkResponse({
    description: '성공',
    type: ApiResponseWithDataDto<CreateUserResponseDto>,
  })
  @Post()
  async create(@Body() createUserRequestDto: CreateUserRequestDto) {
    return await this.usersService.create(createUserRequestDto);
  }
}
