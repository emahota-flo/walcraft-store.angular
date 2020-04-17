import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {Order} from '../../models/order';
import {OrderService} from '../../services/order.service';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let debugElement;
  const orders: Order[] = [
    {
      clientId: 'wl1',
      date: new Date(),
      products: [
        {
          id: 1,
          image: 'image',
          description: 'description',
          price: 100,
          keywords: ['keywords', 'keywords']
        },
        {
          id: 1,
          image: 'image',
          description: 'description',
          price: 100,
          keywords: ['keywords', 'keywords']
        },
      ],
      fullPrice: 200,
      activatedPromotionalCode: true,
      promotionalCode: {discountPercentage: 10, code: 'wl10'},
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrderComponent],
      providers: [
        {
          provide: OrderService, useValue: {
            getOrders: () => of(orders)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set orders', () => {
    component.ngOnInit();
    expect(component.orders).toEqual(orders);
  });
});
