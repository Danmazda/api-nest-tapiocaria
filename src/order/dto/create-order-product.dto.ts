import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do produto.',
    example: 'ac2bd88a-d1b3-49de-a80b-e4539e0bed91',
  })
  productId: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Descrição adicional.',
    example: 'Queijo sem lactose.',
  })
  @IsString()
  description: string;
}
