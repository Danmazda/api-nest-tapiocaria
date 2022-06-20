import { PartialType } from '@nestjs/swagger';
import { CreateTableDto } from './create-table.dto';

// PartialType torna todos os tipos exigidos em opicionais
export class UpdateTableDto extends PartialType(CreateTableDto) {}
