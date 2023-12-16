import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdCampaignsComponent } from './get-ad-campaigns.component';

describe('GetAdCampaignsComponent', () => {
  let component: GetAdCampaignsComponent;
  let fixture: ComponentFixture<GetAdCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAdCampaignsComponent]
    });
    fixture = TestBed.createComponent(GetAdCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
