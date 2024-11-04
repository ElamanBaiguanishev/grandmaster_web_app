// user.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existUser) {
      throw new BadRequestException('This email already exists');
    }

    const newUser = {
      email: createUserDto.email,
      password: createUserDto.password,
      username: createUserDto.username,
      role: { id: createUserDto.roleId }
    }

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role']
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Логика обновления пользователя
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return `User with id #${id} removed`;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role']
    });
  }
}
