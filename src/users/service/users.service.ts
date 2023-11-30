import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from '../dto/response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(createUserRequestDto: CreateUserRequestDto) {
    const { userName } = createUserRequestDto;

    const user = new UserEntity(userName);

    const savedUser = await this.userEntityRepository.save(user);

    // const data: CreateUserResponseDto = {
    //   userId: savedUser.userId,
    //   userName: savedUser.userName,
    //   createdAt: savedUser.createdAt,
    // };

    return plainToInstance(CreateUserResponseDto, savedUser, {
      excludePrefixes: ['deletedAt', 'updatedAt'],
    });
  }
}
