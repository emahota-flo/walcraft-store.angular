import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models/product';

@Pipe({
  name: 'keyword',
  pure: false
})
export class KeywordPipe implements PipeTransform {

  transform(products: Product[], selectedKeywords: any[]): Product[] {

    let newProducts: Product[] = [];

    if (products && selectedKeywords.length !== 0) {
      products.forEach((product) => {
        selectedKeywords.forEach((keyword) => {
          if (product.keywords.includes(keyword)) {
            newProducts.push(product);
          }
        });
      });

      return Array.from(new Set(newProducts));
    } else {
      return products;
    }
  }

}
