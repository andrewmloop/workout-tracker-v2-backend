import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
