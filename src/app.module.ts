import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';

@Module({
  imports: [ConfigModule.forRoot(), ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
