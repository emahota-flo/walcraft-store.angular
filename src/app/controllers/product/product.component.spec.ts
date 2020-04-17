import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {KeywordPipe} from '../../pipes/keyword.pipe';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductComponent, KeywordPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
