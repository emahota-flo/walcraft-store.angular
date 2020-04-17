import {TestBed} from '@angular/core/testing';

import {HttpHelperService} from './http-helper.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HttpHelperService', () => {
  let service: HttpHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
