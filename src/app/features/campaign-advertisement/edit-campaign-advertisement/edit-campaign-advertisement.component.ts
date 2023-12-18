import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignAd } from '../models/campaign-ad.model';
import { UpdateCampaignAdvertisementRequest } from '../models/edit-campaign-advertisement-request.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdCampaign } from '../../ad-campaign/models/ad-campaign.model';
import { Advertisement } from '../../advertisement/models/advertisement.model';

@Component({
  selector: 'app-edit-campaign-advertisement',
  templateUrl: './edit-campaign-advertisement.component.html',
  styleUrls: ['./edit-campaign-advertisement.component.css']
})
export class EditCampaignAdvertisementComponent implements OnInit, OnDestroy {
  model?: CampaignAd;
  id: number | null = null;
  adCampaigns$?: Observable<AdCampaign[]>;
  advertisements$?: Observable<Advertisement[]>;
  selectedAdCampaign?: number;
  selectedAdvertisement?: number;

  routeSubscription?: Subscription;
  getCampaignAdvertisementSubscription?: Subscription;
  updateCampaignAdvertisementSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.adCampaigns$ = this.http.get<AdCampaign[]>("http://localhost:5001/api/AdCampaign/ad-campaigns");
    this.advertisements$ = this.http.get<Advertisement[]>("http://localhost:5001/api/Advertisement/advertisements");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getCampaignAdvertisementSubscription = this.http.get<CampaignAd>(`http://localhost:5001/api/CampaignAd/campaign-advertisement/${this.id}`)
          .subscribe({
            next: (response: any) => {
              response.adCampaignId = response.adCampaign?.id;
              response.advertisementId = response.advertisement?.id;
              this.model = response;
              this.selectedAdCampaign = this.model?.adCampaignId;
              console.log(this.selectedAdCampaign);
              this.selectedAdvertisement = this.model?.advertisementId;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateCampaignAdvertisementRequest: UpdateCampaignAdvertisementRequest =  {
        views: this.model.views,
        displayedTimes: this.model.displayedTimes,
        adCampaignId: this.selectedAdCampaign ?? 0,
        advertisementId: this.selectedAdvertisement ?? 0
      };

      this.updateCampaignAdvertisementSubscription = this.http.put(`http://localhost:5001/api/CampaignAd/campaign-advertisement/${this.id}`, updateCampaignAdvertisementRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('campaign-ads')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getCampaignAdvertisementSubscription?.unsubscribe();
    this.updateCampaignAdvertisementSubscription?.unsubscribe();
  }

}