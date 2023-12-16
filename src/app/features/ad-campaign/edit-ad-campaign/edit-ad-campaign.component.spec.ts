import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdCampaignComponent } from './edit-ad-campaign.component';

describe('EditAdCampaignComponent', () => {
  let component: EditAdCampaignComponent;
  let fixture: ComponentFixture<EditAdCampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdCampaignComponent]
    });
    fixture = TestBed.createComponent(EditAdCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
