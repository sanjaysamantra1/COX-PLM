import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssociationComponent } from './product-association.component';

describe('ProductAssociationComponent', () => {
  let component: ProductAssociationComponent;
  let fixture: ComponentFixture<ProductAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
