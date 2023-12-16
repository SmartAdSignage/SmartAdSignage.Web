import { Component } from '@angular/core';
import { AdCampaign } from '../models/ad-campaign.model';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-get-ad-campaigns',
  templateUrl: './get-ad-campaigns.component.html',
  styleUrls: ['./get-ad-campaigns.component.css']
})
export class GetAdCampaignsComponent {
  adCampaigns$?: Observable<AdCampaign[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 5);
    this.adCampaigns$ = this.http.get<AdCampaign[]>("http://localhost:5001/api/AdCampaign/ad-campaigns", {params: queryParams});
    this.adCampaigns$.subscribe({
    next: (result: any) => this.adCampaigns$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }
}
