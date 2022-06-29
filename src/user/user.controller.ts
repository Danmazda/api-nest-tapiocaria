import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    delete createUserDto.confirmPassword;

    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Visualizar todos os usuários',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Visualizar informações de um usuário específico',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar usuário',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.confirmPassword;
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deletar usuário.',
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
