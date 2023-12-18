import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFinishedAdCampaignsComponent } from './get-finished-ad-campaigns.component';

describe('GetFinishedAdCampaignsComponent', () => {
  let component: GetFinishedAdCampaignsComponent;
  let fixture: ComponentFixture<GetFinishedAdCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetFinishedAdCampaignsComponent]
    });
    fixture = TestBed.createComponent(GetFinishedAdCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
