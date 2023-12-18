import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignAdvertisementComponent } from './edit-campaign-advertisement.component';

describe('EditCampaignAdvertisementComponent', () => {
  let component: EditCampaignAdvertisementComponent;
  let fixture: ComponentFixture<EditCampaignAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCampaignAdvertisementComponent]
    });
    fixture = TestBed.createComponent(EditCampaignAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
