import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './items.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  search(@Query('q') query: string) {
    return this.itemService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }
}
