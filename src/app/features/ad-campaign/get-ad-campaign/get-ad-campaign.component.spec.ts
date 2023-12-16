import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdCampaignComponent } from './get-ad-campaign.component';

describe('GetAdCampaignComponent', () => {
  let component: GetAdCampaignComponent;
  let fixture: ComponentFixture<GetAdCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAdCampaignComponent]
    });
    fixture = TestBed.createComponent(GetAdCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
