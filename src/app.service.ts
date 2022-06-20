import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): { message: string } {
    return { message: 'Hello World!' };
  }
}
