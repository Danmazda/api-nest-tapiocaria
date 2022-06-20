import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getAppStatus(): { message: string } {
    return this.appService.getAppStatus();
  }
}
