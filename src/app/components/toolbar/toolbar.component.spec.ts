import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToolbarComponent} from './toolbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material.module';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      declarations: [ToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
