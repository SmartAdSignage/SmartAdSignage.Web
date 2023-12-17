import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { AdCampaign } from '../models/ad-campaign.model';
import { UpdateAdCampaignRequest } from '../models/edit-ad-campaign-request.model';
import { User } from '../../users/models/user.model';

@Component({
  selector: 'app-edit-ad-campaign',
  templateUrl: './edit-ad-campaign.component.html',
  styleUrls: ['./edit-ad-campaign.component.css']
})
export class EditAdCampaignComponent implements OnInit, OnDestroy {
  model?: AdCampaign;
  id: number | null = null;
  users$?: Observable<User[]>;
  selectedUser?: string;

  routeSubscription?: Subscription;
  getAdCampaignSubscription?: Subscription;
  updateAdCampaignSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getAdCampaignSubscription = this.http.get<AdCampaign>(`http://localhost:5001/api/AdCampaign/ad-campaign/${this.id}`)
          .subscribe({
            next: (response: any) => {
              response.userId = response.user?.id;
              this.model = response;
              this.selectedUser = this.model?.userId;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateAdCampaignRequest: UpdateAdCampaignRequest =  {
        startDate: this.model.startDate,
        endDate: this.model.endDate,
        targetedViews: this.model.targetedViews,
        status: this.model.status,
        userId: this.selectedUser ?? ''
      };

      this.updateAdCampaignSubscription = this.http.put(`http://localhost:5001/api/AdCampaign/ad-campaign/${this.id}`, updateAdCampaignRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('ad-campaigns')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getAdCampaignSubscription?.unsubscribe();
    this.updateAdCampaignSubscription?.unsubscribe();
  }

}
