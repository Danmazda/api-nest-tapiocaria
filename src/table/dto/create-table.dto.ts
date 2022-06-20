import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
export class CreateTableDto {
  @ApiProperty({
    description: 'O número da mesa.',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  number: number;
}
