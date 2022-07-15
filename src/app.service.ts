import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './entities/info.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  getAirQuality(latitude: number, longitude: number) {
    // create API url with latitude and longitude parameters
    let url = `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=6bb893a4-7b0c-4771-bc90-8042d8b77d1b`;
    let response = this.httpService.get(url).pipe(
      map(response => {
        return {
          Result: {
            'Pollution': response.data.data.current.pollution
          }
        }
      }
      ));
    return response;
  }
}
