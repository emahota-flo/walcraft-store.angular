import {EventEmitter, Injectable} from '@angular/core';
import {Product} from '../models/product';
import {CategoryService} from './category.service';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  keywords: any[];
  keywordsEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedKeywords: any[] = [];
  selectedKeywordsEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private categoryService: CategoryService) {
    if (localStorage.getItem('keywords')) {
      this.selectedKeywords = JSON.parse(localStorage.getItem('keywords'));
    }

    this.categoryService.selectedCategoryEvent
      .subscribe(() => {
        this.clearKeywords();
      });
  }

  selectionKeywords(products: Product[]) {
    let keywords: any[] = [];
    for (let product of products) {
      for (let keyword of product.keywords) {
        keywords.push(keyword);
      }
    }

    this.addKeywords(Array.from(new Set(keywords)));
  }

  addKeywords(keywords: any[]) {
    this.keywords = keywords;
    this.keywordsEvent.emit(this.keywords);
  }

  selectKeyword(keyword: string) {
    this.selectedKeywords.push(keyword);
    this.selectedKeywordsEvent.emit(this.selectedKeywords);
    localStorage.setItem('keywords', JSON.stringify(this.selectedKeywords));
  }

  deleteKeyword(keyword: string) {
    this.selectedKeywords.splice(this.selectedKeywords.indexOf(keyword), 1);
    this.selectedKeywordsEvent.emit(this.selectedKeywords);
    localStorage.setItem('keywords', JSON.stringify(this.selectedKeywords));
  }

  clearKeywords() {
    this.selectedKeywords = [];
    this.selectedKeywordsEvent.emit(this.selectedKeywords);
    localStorage.removeItem('keywords');
  }
}
