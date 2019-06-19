import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElgibilityRulesComponent } from './elgibility-rules.component';

describe('ElgibilityRulesComponent', () => {
  let component: ElgibilityRulesComponent;
  let fixture: ComponentFixture<ElgibilityRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElgibilityRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElgibilityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
