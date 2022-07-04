import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    const data = { ...dto };
    try {
      return this.prisma.product.create({ data });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.product.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`${id} não encontrado!`);
    }
    return record;
  }
  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
  async findOne(id: string): Promise<Product> {
    return await this.findById(id);
  }
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    //Partial torna o que é requirido em opicional
    await this.findById(id);
    const data: Partial<Product> = { ...dto };
    try {
      return this.prisma.product.update({ where: { id }, data });
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
