import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeRequestDetailsComponent } from './intake-request-details.component';

describe('IntakeRequestDetailsComponent', () => {
  let component: IntakeRequestDetailsComponent;
  let fixture: ComponentFixture<IntakeRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
