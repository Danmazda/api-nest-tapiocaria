import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('status')
@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @ApiOperation({ summary: 'Ver status da aplicação' })
  getAppStatus(): string {
    return this.appService.getAppStatus();
  }
}
