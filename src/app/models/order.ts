import {Product} from './product';
import {PromotionalCode} from './promotional-code';

export class Order {
  clientId: string;
  date: Date;
  products: Product[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode: PromotionalCode;
}
