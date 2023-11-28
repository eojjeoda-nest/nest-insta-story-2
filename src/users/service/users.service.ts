import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(createUserRequestDto: CreateUserRequestDto) {
    const { userName } = createUserRequestDto;

    const user = new UserEntity();
    user.createUser(userName);

    try {
      const savedUser = await this.userEntityRepository.save(user);
      return savedUser;
    } catch (err) {
      throw new Error('db error');
    }
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
