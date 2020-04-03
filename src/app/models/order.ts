import {Product} from './product';

export class Order {
  date: Date;
  products: Product[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode: string;
}
