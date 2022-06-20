import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  table: Table[] = [];
  findAll() {
    return this.table;
  }
  create(createTableDto: CreateTableDto) {
    const id = 'random_id';
    this.table.push({ id, ...createTableDto });
    return { id, ...createTableDto };
  }
}
