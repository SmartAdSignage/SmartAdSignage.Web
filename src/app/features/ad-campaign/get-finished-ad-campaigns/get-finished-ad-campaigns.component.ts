import { Component, OnInit } from '@angular/core';
import { FinishedAdCampaign } from '../models/finished-ad-campaign.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthGuard } from '../../auth/services/auth-guard.service';
import { User } from '../../users/models/user.model';

@Component({
  selector: 'app-get-finished-ad-campaigns',
  templateUrl: './get-finished-ad-campaigns.component.html',
  styleUrls: ['./get-finished-ad-campaigns.component.css']
})
export class GetFinishedAdCampaignsComponent implements OnInit{
  finishedAdCampaigns$?: Observable<FinishedAdCampaign[]>;
  userIdSubscription?: Observable<User>;
  userId?: string;


  constructor(private http: HttpClient, private router: Router, private service: AuthGuard) { }

  ngOnInit(): void {
    var username = this.service.getNameFromToken();
    console.log(username);
    this.getUserId(username).pipe(
      switchMap(userId => {
        return this.http.get<FinishedAdCampaign[]>(`http://localhost:5001/api/AdCampaign/results/${userId}`);
      })
    ).subscribe({
      next: (result: any) => this.finishedAdCampaigns$ = of(result),
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
  
  // Get user id from username
  getUserId(username: string ): Observable<string> {
    return this.http.get<User>(`http://localhost:5001/api/User/${username}`).pipe(
      map((result: User) => {
        this.userId = result.id;
        return this.userId;
      })
    );
  }
}