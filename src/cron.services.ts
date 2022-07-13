import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Info } from './entities/info.entity';

@Injectable()
export class ScheduledTasksService {
    constructor(private readonly httpService: HttpService) {}

    // add cron job for every minute
    @Cron('00 * * * * *')
    everyMinute() {
        let url = `https://api.airvisual.com/v2/nearest_city?lat=48.856613&lon=2.352222&key=6bb893a4-7b0c-4771-bc90-8042d8b77d1b`;
        let infos: Info = new Info();
        let response = this.httpService.get(url).pipe(
            map(response => {

                infos.ts = response.data.data.current.pollution.ts;
                infos.aqius = response.data.data.current.pollution.aqius;
                infos.mainus = response.data.data.current.pollution.mainus;
                infos.aqicn = response.data.data.current.pollution.aqicn;
                infos.maincn = response.data.data.current.pollution.maincn;
                // save the info in the database here
            }
        ));
        console.log('Cron job every minute');
    }
}