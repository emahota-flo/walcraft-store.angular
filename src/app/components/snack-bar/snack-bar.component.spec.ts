import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackBarComponent} from './snack-bar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SnackBarComponent],
      providers: [{provide: MAT_SNACK_BAR_DATA, useValue: {message: 'Hi'}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
