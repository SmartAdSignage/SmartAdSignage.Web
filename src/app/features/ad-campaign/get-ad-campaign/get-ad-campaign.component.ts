import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AdCampaign } from '../models/ad-campaign.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-get-ad-campaign',
  templateUrl: './get-ad-campaign.component.html',
  styleUrls: ['./get-ad-campaign.component.css']
})
export class GetAdCampaignComponent implements OnInit {
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
