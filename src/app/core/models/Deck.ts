import { ShopItem } from './ShopItem';

export interface Deck extends ShopItem {
  sizeInches: number;
  colors?: string[];
}
