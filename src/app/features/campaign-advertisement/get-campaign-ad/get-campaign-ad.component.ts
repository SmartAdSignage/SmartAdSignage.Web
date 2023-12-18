import { Component } from '@angular/core';
import { CampaignAd } from '../models/campaign-ad.model';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { AdCampaign } from '../../ad-campaign/models/ad-campaign.model';

@Component({
  selector: 'app-get-campaign-ad',
  templateUrl: './get-campaign-ad.component.html',
  styleUrls: ['./get-campaign-ad.component.css']
})
export class GetCampaignAdComponent {
  campaignAds$?: Observable<CampaignAd[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.campaignAds$ = this.http.get<CampaignAd[]>("http://localhost:5001/api/CampaignAd/campaign-advertisements", {params: queryParams}).pipe(
      map((response: any) => {
        return response.map((campaignAd: any) => {
          const adCampaignId = campaignAd.adCampaign?.id; 
          const advertisementId = campaignAd.advertisement?.id;
          return {
            id: campaignAd.id,
            views: campaignAd.views,
            displayedTimes: campaignAd.displayedTimes,
            adCampaignId: adCampaignId,
            advertisementId: advertisementId,
          } as any;
        });
      })
    );
    this.campaignAds$.subscribe({
    next: (result: any) => this.campaignAds$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
    this.http.delete(`http://localhost:5001/api/CampaignAd/campaign-advertisement/${id}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }
}
