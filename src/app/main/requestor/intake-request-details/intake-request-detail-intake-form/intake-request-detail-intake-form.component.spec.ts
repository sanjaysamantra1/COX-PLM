import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeRequestDetailIntakeFormComponent } from './intake-request-detail-intake-form.component';

describe('IntakeRequestDetailIntakeFormComponent', () => {
  let component: IntakeRequestDetailIntakeFormComponent;
  let fixture: ComponentFixture<IntakeRequestDetailIntakeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeRequestDetailIntakeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeRequestDetailIntakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
