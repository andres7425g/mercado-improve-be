import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { concatMap, map, tap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import {
  objectItemTransform,
  objectQueryTransform,
} from 'src/utils/objectQueryTransform';
import { Result } from './items.model';

@Injectable()
export class ItemService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private fetchCategory(categoryId: string) {
    const ML_API_CATEGORIES =
      this.configService.get<string>('ML_API_CATEGORIES');

    return this.httpService
      .get(`${ML_API_CATEGORIES}${categoryId}`)
      .pipe(map((response) => response.data));
  }

  search(query: string) {
    const ML_API_SEARCH = this.configService.get<string>('ML_API_SEARCH');
    return this.httpService.get(`${ML_API_SEARCH}?limit=4&q=:${query}`).pipe(
      concatMap((searchResponse) => {
        const categoriesArray = [];
        return from(searchResponse.data.results).pipe(
          concatMap((element: Result) =>
            this.fetchCategory(element.category_id),
          ),
          tap((category) => categoriesArray.push(category.name)),
          toArray(),
          map(() =>
            objectQueryTransform(categoriesArray, searchResponse.data.results),
          ),
        );
      }),
    );
  }

  findOne(id: string) {
    const ML_API_ITEMS = this.configService.get<string>('ML_API_ITEMS');

    return this.httpService
      .get(`${ML_API_ITEMS}${id}`)
      .pipe(map((response) => objectItemTransform(response.data)));
  }
}
