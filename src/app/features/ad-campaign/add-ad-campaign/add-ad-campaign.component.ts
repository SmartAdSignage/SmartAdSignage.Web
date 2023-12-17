import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddAdCampaignRequest } from '../models/add-ad-campaign-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../users/models/user.model';

@Component({
  selector: 'app-add-ad-campaign',
  templateUrl: './add-ad-campaign.component.html',
  styleUrls: ['./add-ad-campaign.component.css']
})
export class AddAdCampaignComponent implements OnInit, OnDestroy {
  model: AddAdCampaignRequest;
  users$?: Observable<User[]>;
  private AddadCampaignSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      startDate: new Date(),
      endDate: new Date(),
      targetedViews: 0,
      status: '',
      userId: ''
    };
  }

  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");
  }

  onFormSubmit(): void {
    this.AddadCampaignSubscription = this.http.post("http://localhost:5001/api/AdCampaign/ad-campaign", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('ad-campaigns')}
    });
  }

  ngOnDestroy(): void {
    this.AddadCampaignSubscription?.unsubscribe();
  }
}
