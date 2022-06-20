import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import * as winston from 'winston';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // Now I just put the raw database connection config here, but TODO: Proper management of configuration, cross environment, clean config management solution soon later.
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    WinstonModule.forRoot({
      //options
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(), // 로그를 남긴 시각을 함께 표시
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              // 어디에서 로그를 남겼는지를 구분하는 appName( 'MyApp' )과 로그를 읽기 쉽도록 하는 옵션인 prettyPrint 옵션
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
