import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserResponseDto extends PickType(UserDto, [
  'userId',
  'createdAt',
] as const) {}