import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountGeneralInfoComponent } from './discount-general-info.component';

describe('DiscountGeneralInfoComponent', () => {
  let component: DiscountGeneralInfoComponent;
  let fixture: ComponentFixture<DiscountGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
