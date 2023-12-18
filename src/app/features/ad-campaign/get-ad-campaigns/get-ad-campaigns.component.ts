import { Component, OnInit } from '@angular/core';
import { AdCampaign } from '../models/ad-campaign.model';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-ad-campaigns',
  templateUrl: './get-ad-campaigns.component.html',
  styleUrls: ['./get-ad-campaigns.component.css']
})
export class GetAdCampaignsComponent implements OnInit{
  adCampaigns$?: Observable<AdCampaign[]>;
  deleteAdCampaignSubscription?: Subscription;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.adCampaigns$ = this.http.get<AdCampaign[]>("http://localhost:5001/api/AdCampaign/ad-campaigns", {params: queryParams}).pipe(
      map((response: any) => {
        return response.map((adCampaign: any) => {
          const userId = adCampaign.user?.id; // Access userId property of user
          return {
            id: adCampaign.id,
            startDate: adCampaign.startDate,
            endDate: adCampaign.endDate,
            status: adCampaign.status,
            targetedViews: adCampaign.targetedViews,
            userId: userId
          } as any;
        });
      })
    );
    this.adCampaigns$.subscribe({
    next: (result: any) => this.adCampaigns$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
      this.deleteAdCampaignSubscription = this.http.delete(`http://localhost:5001/api/AdCampaign/ad-campaign/${id}`).subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      });
    }
}
