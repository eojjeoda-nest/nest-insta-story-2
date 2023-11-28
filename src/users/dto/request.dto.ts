import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserRequestDto extends PickType(UserDto, [
  'userName',
] as const) {}
