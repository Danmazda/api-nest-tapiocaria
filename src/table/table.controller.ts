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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';
import { TableService } from './table.service';

@ApiTags('table')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  //all
  @ApiOperation({
    summary: 'Visualizar informações de uma mesa',
  })
  @Get()
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  //id
  @ApiOperation({
    summary: 'Visualizar informações de uma mesa',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  //create
  @ApiOperation({
    summary: 'Criar uma nova mesa',
  })
  @Post()
  create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return this.tableService.create(createTableDto);
  }

  //delete
  @ApiOperation({
    summary: 'Deletar uma mesa',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    //Nest se vira com promises retornadas, mas se for apenas chamar a promise tem que usar await
    await this.tableService.delete(id);
  }

  //update
  @ApiOperation({
    summary: 'Atualizar uma mesa',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }
}
