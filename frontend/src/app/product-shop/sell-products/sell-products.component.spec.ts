import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductsComponent } from './sell-products.component';

describe('SellProductsComponent', () => {
  let component: SellProductsComponent;
  let fixture: ComponentFixture<SellProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
