import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCampaignAdvertisementRequest } from '../models/add-campaign-advertisement-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdCampaign } from '../../ad-campaign/models/ad-campaign.model';
import { Advertisement } from '../../advertisement/models/advertisement.model';

@Component({
  selector: 'app-add-campaign-advertisement',
  templateUrl: './add-campaign-advertisement.component.html',
  styleUrls: ['./add-campaign-advertisement.component.css']
})
export class AddCampaignAdvertisementComponent implements OnInit, OnDestroy {
  model: AddCampaignAdvertisementRequest;
  adCampaigns$?: Observable<AdCampaign[]>;
  advertisements$?: Observable<Advertisement[]>;
  private AddCampaignAdvertisementSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      views: 0,
      displayedTimes: 0,
      adCampaignId: 0,
      advertisementId: 0
    };
  }

  ngOnInit(): void {
    this.adCampaigns$ = this.http.get<AdCampaign[]>("http://localhost:5001/api/AdCampaign/ad-campaigns");
    this.advertisements$ = this.http.get<Advertisement[]>("http://localhost:5001/api/Advertisement/advertisements");
  }

  onFormSubmit(): void {
    this.AddCampaignAdvertisementSubscription = this.http.post("http://localhost:5001/api/CampaignAd/campaign-advertisement", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('campaign-ads')}
    });
  }

  ngOnDestroy(): void {
    this.AddCampaignAdvertisementSubscription?.unsubscribe();
  }
}
