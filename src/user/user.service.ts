import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    name: true,
    password: false,
    image: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`${id} não encontrado!`);
    }
    return record;
  }
  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: this.userSelect });
  }
  async findOne(id: string): Promise<User> {
    return await this.findById(id);
  }
  async create(dto: CreateUserDto): Promise<User> {
    const { password, confirmPassword } = dto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'A senha e a confirmação devem ser as mesmas.',
      );
    }
    delete dto.confirmPassword;
    const data: User = { ...dto, password: await bcrypt.hash(password, 10) };
    try {
      return await this.prisma.user.create({ data, select: this.userSelect });
    } catch (error) {
      this.handleError(error);
    }
  }
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const { password, confirmPassword } = dto;
    if (password) {
      if (password !== confirmPassword) {
        throw new BadRequestException(
          'A senha e a confirmação devem ser as mesmas.',
        );
      }
      delete dto.confirmPassword;
    }
    //Partial torna o que é requirido em opicional
    await this.findById(id);
    const data: Partial<User> = {
      ...dto,
      password: await bcrypt.hash(password, 10),
    };
    try {
      // await é necessário para tratamento de erro
      return await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: Error) {
    const errorLines = error.message?.split('\n');
    const lastLine = errorLines[errorLines.length - 1].trim();
    if (!lastLine) {
      throw new ConflictException(error.message);
    }
    throw new UnprocessableEntityException(lastLine || 'Erro ao criar mesa.');
  }
}
