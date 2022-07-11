import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsInt, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Id do usuário que fez o pedido.',
    example: '0556edf9-7dca-4200-ab48-757b09785d0b',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Número da mesa do usuário que fez o pedido.',
    example: 1,
  })
  @IsInt()
  tableNumber: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista de objetos com ID do produto, quantidade e descrição',
    example: [
      {
        productId: 'ac2bd88a-d1b3-49de-a80b-e4539e0bed91',
        quantity: 1,
        description: 'Queijo sem lactose',
      },
    ],
  })
  products: CreateOrderProductDto[];
}
