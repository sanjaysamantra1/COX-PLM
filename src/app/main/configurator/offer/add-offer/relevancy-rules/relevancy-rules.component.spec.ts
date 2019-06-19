import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevancyRulesComponent } from './relevancy-rules.component';

describe('RelevancyRulesComponent', () => {
  let component: RelevancyRulesComponent;
  let fixture: ComponentFixture<RelevancyRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevancyRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevancyRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
