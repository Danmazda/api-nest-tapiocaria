import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Matches, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'Apelido do usuário',
    example: 'MestreDosMagos',
  })
  @IsString()
  nickname: string;
  @ApiProperty({
    description: 'Nome do usuário ',
    example: 'Danilo Procópio',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'SuperSafePassword123@',
  })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca!',
  })
  password: string;
  @ApiProperty({
    description: 'Confirmação de senha, deve ser igual a senha',
    example: 'SuperSafePassword123@',
  })
  @IsString()
  confirmPassword: string;
  @ApiProperty({
    description: 'Avatar do usuário',
    example: 'https://avatars.githubusercontent.com/u/85803705?v=4',
  })
  @IsUrl()
  image: string;
}
