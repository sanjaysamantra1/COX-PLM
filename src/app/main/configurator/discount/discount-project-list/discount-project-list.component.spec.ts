import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountProjectListComponent } from './discount-project-list.component';

describe('DiscountProjectListComponent', () => {
  let component: DiscountProjectListComponent;
  let fixture: ComponentFixture<DiscountProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
