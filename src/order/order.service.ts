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
        connect: dto.products.map((productId) => ({ id: productId })),
      },
    };

    return await this.prisma.order.create({
      data,
      select: {
        id: true,
        user: {
          select: {
            nickname: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        user: {
          select: {
            nickname: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            name: true,
            image: true,
          },
        },
        table: {
          select: {
            id: true,
            number: true,
          },
        },
        products: {
          select: { id: true, name: true, description: true, image: true },
        },
      },
    });
  }
}
