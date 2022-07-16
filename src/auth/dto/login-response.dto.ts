import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token gerado pelo backend.',
    example: 'TOKEN_GERADO_AUTOMATICAMENTE',
  })
  token: string;

  @ApiProperty({
    description: 'Usuário para o qual o jwt foi gerado.',
  })
  user: User;
}
