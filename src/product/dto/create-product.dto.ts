import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Frajola',
  })
  @IsString()
  @MinLength(5)
  name: string;
  @ApiProperty({
    description: 'Descrição do produto, com ingredientes.',
    example: 'Tapioca de presunto e queijo muçarela.',
  })
  @IsString()
  @MinLength(19)
  description: string;
  @ApiProperty({
    description: 'Preço total do produto.',
    example: 10,
  })
  @IsNumber()
  price: number;
  @ApiProperty({
    description: 'Link para a imagem do produto.',
    example:
      'https://www.cozinhatecnica.com/wp-content/uploads/2020/09/receita-de-tapioca-1.jpg',
  })
  @IsUrl()
  image: string;
}
