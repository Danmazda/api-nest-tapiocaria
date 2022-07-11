import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateOrderDto) {
    const table = await this.prisma.table.findUnique({
      where: { number: dto.tableNumber },
    });
    const tableId = table.id;
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    const userId = user.id;
    // const products: string[] = await Promise.all(
    //   dto.products.map(async (p) => {
    //     const product = await this.prisma.product.findUnique({
    //       where: { id: p },
    //     });
    //     return product.id;
    //   }),
    // );

    return await this.prisma.order.create({
      data: {
        userId,
        tableId,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({});
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }
}
