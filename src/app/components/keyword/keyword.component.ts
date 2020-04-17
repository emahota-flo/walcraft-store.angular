import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeywordService} from '../../services/keyword.service';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit, OnDestroy {

  keywords: any[];
  keywords$: any;

  selectedKeywords$: any;
  selectedKeywords: string[] = [];

  quantityKeywords: number = 20;

  constructor(private keywordService: KeywordService) {
  }

  ngOnInit(): void {
    this.getKeywords();
    this.getSelectedKeywords();

    this.selectedKeywords = this.keywordService.selectedKeywords;
  }

  ngOnDestroy(): void {
    this.keywords$.unsubscribe();
    this.selectedKeywords$.unsubscribe();
  }

  getKeywords() {
    this.keywords$ = this.keywordService.keywordsEvent
      .subscribe(keywords => {
        this.keywords = keywords;
      });
  }

  addKeyword(keyword: string) {
    this.keywordService.selectKeyword(keyword);
  }

  deleteKeyword(keyword: string) {
    this.keywordService.deleteKeyword(keyword);
  }

  getSelectedKeywords() {
    this.selectedKeywords$ = this.keywordService.selectedKeywordsEvent
      .subscribe(keywords => {
        this.selectedKeywords = keywords;
      });
  }
}
