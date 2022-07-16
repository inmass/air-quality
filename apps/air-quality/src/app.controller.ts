import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('/air-quality')
  getAirQuality(@Query('latitude') latitude: number, @Query('longitude') longitude: number) {
    return this.appService.getAirQuality(latitude, longitude); // send parameters to service
  }
  
  @Get('/paris-most-polluted')
  getParisMostPolluted() {
    return this.appService.getParisMostPolluted();
  }
}
