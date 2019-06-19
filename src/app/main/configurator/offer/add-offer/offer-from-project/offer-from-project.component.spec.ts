import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFromProjectComponent } from './offer-from-project.component';

describe('OfferFromProjectComponent', () => {
  let component: OfferFromProjectComponent;
  let fixture: ComponentFixture<OfferFromProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferFromProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFromProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
