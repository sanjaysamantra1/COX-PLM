import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeRequestDetailMasterFormComponent } from './intake-request-detail-master-form.component';

describe('IntakeRequestDetailMasterFormComponent', () => {
  let component: IntakeRequestDetailMasterFormComponent;
  let fixture: ComponentFixture<IntakeRequestDetailMasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeRequestDetailMasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeRequestDetailMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
