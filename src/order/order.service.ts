import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: { connect: { id: dto.userId } },
      table: { connect: { number: dto.tableNumber } },
      products: {
        connect: dto.products.map((p) => {
          return { id: p };
        }),
      },
    };

    return await this.prisma.order.create({
      data,
    });
  }

  findAll() {
    return this.prisma.order.findMany({});
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }
}
