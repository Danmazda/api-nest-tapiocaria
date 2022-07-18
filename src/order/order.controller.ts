import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('order')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiOperation({ summary: 'Criar um novo pedido.' })
  @Post()
  create(@LoggedUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user.id, createOrderDto);
  }

  @ApiOperation({ summary: 'Ver todos os pedidos' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Ver pedido específico' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
