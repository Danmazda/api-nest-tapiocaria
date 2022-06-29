import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const record = await this.prisma.table.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`${id} não encontrado!`);
    }
    return record;
  }
  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }
  async findOne(id: string): Promise<Table> {
    return await this.findById(id);
  }
  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };
    try {
      return this.prisma.table.create({ data });
    } catch (error) {
      this.handleError(error);
    }
  }
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.table.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    //Partial torna o que é requirido em opicional
    await this.findById(id);
    const data: Partial<Table> = { ...dto };
    try {
      return this.prisma.table.update({ where: { id }, data });
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: Error) {
    const errorLines = error.message?.split('\n');
    const lastLine = errorLines[errorLines.length - 1].trim();
    if (!lastLine) {
      console.error(error);
    }
    throw new UnprocessableEntityException(lastLine || 'Erro ao criar mesa.');
  }
}
