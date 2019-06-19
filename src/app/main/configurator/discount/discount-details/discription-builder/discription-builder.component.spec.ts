import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscriptionBuilderComponent } from './discription-builder.component';

describe('DiscriptionBuilderComponent', () => {
  let component: DiscriptionBuilderComponent;
  let fixture: ComponentFixture<DiscriptionBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscriptionBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscriptionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
