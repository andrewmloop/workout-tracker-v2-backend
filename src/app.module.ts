import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RoutineModule } from './routine/routine.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get('NODE_ENV') === 'production'
            ? configService.get('MONGODB_URI_PROD')
            : configService.get('MONGODB_URI_DEV'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ExerciseModule,
    RoutineModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
