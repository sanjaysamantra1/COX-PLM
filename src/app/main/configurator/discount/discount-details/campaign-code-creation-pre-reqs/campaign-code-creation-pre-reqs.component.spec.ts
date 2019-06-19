import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCodeCreationPreReqsComponent } from './campaign-code-creation-pre-reqs.component';

describe('CampaignCodeCreationPreReqsComponent', () => {
  let component: CampaignCodeCreationPreReqsComponent;
  let fixture: ComponentFixture<CampaignCodeCreationPreReqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCodeCreationPreReqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCodeCreationPreReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
