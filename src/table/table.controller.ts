import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  //all
  @ApiOperation({
    summary: 'Visualizar informações de uma mesa',
  })
  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  //id
  @ApiOperation({
    summary: 'Visualizar informações de uma mesa',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(id);
  }

  //create
  @ApiOperation({
    summary: 'Criar uma nova mesa',
  })
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }
}
