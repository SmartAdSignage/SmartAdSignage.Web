import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaignAdvertisementComponent } from './add-campaign-advertisement.component';

describe('AddCampaignAdvertisementComponent', () => {
  let component: AddCampaignAdvertisementComponent;
  let fixture: ComponentFixture<AddCampaignAdvertisementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCampaignAdvertisementComponent]
    });
    fixture = TestBed.createComponent(AddCampaignAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
