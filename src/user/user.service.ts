import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`${id} não encontrado!`);
    }
    return record;
  }
  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async findOne(id: string): Promise<User> {
    return await this.findById(id);
  }
  async create(dto: CreateUserDto): Promise<User> {
    const data: User = { ...dto };
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      this.handleError(error);
    }
  }
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    //Partial torna o que é requirido em opicional
    await this.findById(id);
    const data: Partial<User> = { ...dto };
    try {
      // await é necessário para tratamento de erro
      return await this.prisma.user.update({ where: { id }, data });
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

  async doesUserExists(dto: CreateUserDto) {
    const { nickname } = dto;
    const user = await this.prisma.user.findUnique({ where: { nickname } });
    return Boolean(user);
  }
}
