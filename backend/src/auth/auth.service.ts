import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';
import { PayloadUser } from './PayloadUser';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login(userDto: CreateUserDto) {
    console.log("login service")
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)

    const user = await this.userService.create({ ...userDto, password: hashPassword })

    console.log(user)

    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const { id, email, role = user.role, username } = user
    return {
      id,
      email,
      role,
      username,
      token: this.jwtService.sign({ email, id, role, username }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    console.log("validateUser")
    const user = await this.userService.getUserByEmail(userDto.email);
    console.log(user)

    if (!user) {
      throw new UnauthorizedException({ message: 'Некорректный email' });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Некорректный пароль' });
    }

    return user;
  }
}
