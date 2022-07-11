import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt } from 'class-validator';

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

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista de produtos no pedido (ID)',
    example: [
      'ac2bd88a-d1b3-49de-a80b-e4539e0bed91',
      '796d8076-d4bb-4549-bf8f-15d4f8879c7c',
    ],
  })
  products: string[];
}
