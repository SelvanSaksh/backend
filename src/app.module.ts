import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StoreModule } from './Stores/store.module';
import { SurveyModule } from './survey/survey.module';
import { AuditModule } from './audit/audit.module';
import { UserTrackingModule } from './user_tracking/userTracking.module';
  
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot(
    //   {
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '12345',
    //   database: 'schoofi',
    //   entities: [join(__dirname, '**/*.entity{.ts,.js}')],
    //   synchronize: true,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<any> => ({
        type: configService.get('DB_TYPE') as 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: false  ,
        autoLoadEntities: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
      AuthModule, UserModule, StoreModule , SurveyModule , AuditModule , UserTrackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
