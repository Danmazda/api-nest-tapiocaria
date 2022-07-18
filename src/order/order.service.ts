import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: { connect: { id: userId } },
      table: { connect: { number: dto.tableNumber } },
      products: {
        createMany: {
          data: dto.products,
        },
      },
    };

    return await this.prisma.order
      .create({
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
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch(handleError);
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
          select: {
            product: { select: { id: true, name: true } },
            quantity: true,
            description: true,
          },
        },
      },
    });
  }
}
