import { Author } from 'src/model/author.model';

export interface ResultQueryResponse {
  author: Author;
  categories: string[];
  items: Result[];
}

export interface ItemQueryResponse {
  author: Author;
  items: Item[];
}

export interface Result {
  shipping: any;
  thumbnail: string;
  currency_id: string;
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  category_id: string;
  seller: seller;
  map(
    arg0: (result: Result) => {
      id: string;
      title: string;
      price: { currency: string; amount: number; decimals: number };
      picture: string;
      condition: string;
      free_shipping: boolean;
    },
  ): Result;
}

export interface Item {
  initial_quantity: number;
  currency_id: any;
  id: string;
  title: string;
  price: number;
  picture: string;
  pictures: any;
  condition: string;
  shipping: any;
  free_shipping: boolean;
  sold_quantity: number;
  descriptions: string | string[];
  map(
    arg0: (item: Item) => {
      id: string;
      title: string;
      price: { currency: string; amount: number; decimals: number };
      picture: string;
      condition: string;
      free_shipping: boolean;
      sold_quantity: number;
      description: string;
    },
  ): Item;
}

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

interface seller {
  id: number;
  nickname: string;
}
