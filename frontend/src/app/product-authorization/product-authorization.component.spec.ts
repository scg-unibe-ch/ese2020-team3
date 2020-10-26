import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAuthorizationComponent } from './product-authorization.component';

describe('ProductAuthorizationComponent', () => {
  let component: ProductAuthorizationComponent;
  let fixture: ComponentFixture<ProductAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
