import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Visualizar todos os usuários',
  })
  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Visualizar informações de um usuário específico',
  })
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar usuário',
  })
  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deletar usuário.',
  })
  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
