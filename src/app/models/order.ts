import {Product} from './product';
import {PromotionalCode} from './promotional-code';

export interface OrderBody {
  clientId: string;
  date: Date;
  products: Product[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode: PromotionalCode;
}

export class Order implements OrderBody {
  clientId: string;
  date: Date;
  products: Product[];
  fullPrice: number;
  activatedPromotionalCode: boolean;
  promotionalCode: PromotionalCode;

  constructor(clientId: string,
              date: Date,
              products: Product[],
              fullPrice: number,
              activatedPromotionalCode: boolean,
              promotionalCode: PromotionalCode) {
    this.clientId = clientId;
    this.date = date;
    this.products = products;
    this.fullPrice = fullPrice;
    this.activatedPromotionalCode = activatedPromotionalCode;
    this.promotionalCode = promotionalCode;
  }
}
