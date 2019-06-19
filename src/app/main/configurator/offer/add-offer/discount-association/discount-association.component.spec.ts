import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAssociationComponent } from './discount-association.component';

describe('DiscountAssociationComponent', () => {
  let component: DiscountAssociationComponent;
  let fixture: ComponentFixture<DiscountAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
