import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const { nickname, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { nickname },
      select: {
        nickname: true,
        name: true,
        image: true,
        password: true,
      },
    });
    if (!user) throw new NotFoundException('User not found!');
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return { token: this.jwtservice.sign({ nickname }), user };
    } else {
      throw new ForbiddenException('Access Denied!');
    }
  }
}
