import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //all
  @ApiOperation({
    summary: 'Visualizar informações de todos os produtos',
  })
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  //id
  @ApiOperation({
    summary: 'Visualizar informações de um produto',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  //create
  @ApiOperation({
    summary: 'Criar um novo produto',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  //delete
  @ApiOperation({
    summary: 'Deletar um produto',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    //Nest se vira com promises retornadas, mas se for apenas chamar a promise tem que usar await
    await this.productService.delete(id);
  }

  //update
  @ApiOperation({
    summary: 'Atualizar um produto',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, dto);
  }
}
