import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeRequestListComponent } from './intake-request-list.component';

describe('IntakeRequestListComponent', () => {
  let component: IntakeRequestListComponent;
  let fixture: ComponentFixture<IntakeRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
