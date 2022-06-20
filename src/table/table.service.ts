import { Injectable } from '@nestjs/common';

@Injectable()
export class TableService {
  findAll() {
    return 'Todas as mesas';
  }
  create() {
    return 'Criar mesa.';
  }
}
