import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksService } from './cron.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './entities/info.entity';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // the host of your DB
      port: 3306, // the port of your DB
      username: 'root', // the username
      password: '', // the password
      database: 'air-quality', // the name of your DB
      entities: [
        Info,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Info])
  ],
  controllers: [AppController],
  providers: [AppService, ScheduledTasksService],
})
export class AppModule {}
