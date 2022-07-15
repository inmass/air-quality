import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Info } from './entities/info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ScheduledTasksService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Info) private readonly infoRepository: Repository<Info>
    ) {}

    // add cron job for every minute
    @Cron('00 * * * * *')
    async everyMinute() {
        let url = `https://api.airvisual.com/v2/nearest_city?lat=48.856613&lon=2.352222&key=6bb893a4-7b0c-4771-bc90-8042d8b77d1b`;
        let info = this.infoRepository.create();
        let response = await axios.get(url);

        info.ts = response.data.data.current.pollution.ts;
        info.aqius = response.data.data.current.pollution.aqius;
        info.mainus = response.data.data.current.pollution.mainus;
        info.aqicn = response.data.data.current.pollution.aqicn;
        info.maincn = response.data.data.current.pollution.maincn;
        // save the info in the database here
        this.infoRepository.save(info);
    }
}