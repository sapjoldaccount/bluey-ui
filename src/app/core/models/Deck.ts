import { Product } from './Product';

export interface Deck extends Product {
    sizeInches: number;
    colors?: string[];
}
