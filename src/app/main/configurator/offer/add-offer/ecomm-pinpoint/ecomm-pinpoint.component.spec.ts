import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommPinpointComponent } from './ecomm-pinpoint.component';

describe('EcommPinpointComponent', () => {
  let component: EcommPinpointComponent;
  let fixture: ComponentFixture<EcommPinpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommPinpointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommPinpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
