import {TestBed} from '@angular/core/testing';

import {KeywordService} from './keyword.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('KeywordService', () => {
  let service: KeywordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(KeywordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
