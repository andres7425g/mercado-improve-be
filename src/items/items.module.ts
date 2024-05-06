import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
