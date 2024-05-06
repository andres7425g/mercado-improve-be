import { author } from 'src/const/author';
import { Item, Result } from 'src/items/items.model';

const uniqueCategory = (categories: string[]): string[] => {
  return Array.from(new Set(categories));
};

export const objectQueryTransform = (categories: string[], results: Result) => {
  return {
    author,
    categories: uniqueCategory(categories),
    items: results.map((result: Result) => ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price as unknown as number,
        decimals: parseFloat(
          ((result.price as unknown as number) % 1).toFixed(2),
        ),
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
      seller: result.seller,
    })),
  };
};

export const objectItemTransform = (item: Item) => {
  return {
    author,
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: parseFloat(
          ((item.price as unknown as number) % 1).toFixed(2),
        ),
      },
      picture: item.pictures[0].url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.initial_quantity,
      description: item.descriptions,
    },
  };
};
