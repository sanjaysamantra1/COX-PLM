import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSitesComponent } from './discount-sites.component';

describe('DiscountSitesComponent', () => {
  let component: DiscountSitesComponent;
  let fixture: ComponentFixture<DiscountSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
