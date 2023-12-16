import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCampaignAdComponent } from './get-campaign-ad.component';

describe('GetCampaignAdComponent', () => {
  let component: GetCampaignAdComponent;
  let fixture: ComponentFixture<GetCampaignAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCampaignAdComponent]
    });
    fixture = TestBed.createComponent(GetCampaignAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
