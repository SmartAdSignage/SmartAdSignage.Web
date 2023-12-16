import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdCampaign } from '../models/ad-campaign.model';
import { UpdateAdCampaignRequest } from '../models/edit-ad-campaign-request.model';

@Component({
  selector: 'app-edit-ad-campaign',
  templateUrl: './edit-ad-campaign.component.html',
  styleUrls: ['./edit-ad-campaign.component.css']
})
export class EditAdCampaignComponent implements OnInit {
  model?: AdCampaign;
  id: number | null = null;

  routeSubscription?: Subscription;
  getAdCampaignSubscription?: Subscription;
  updateAdCampaignSubscription?: Subscription;
  deleteAdCampaignSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getAdCampaignSubscription = this.http.get<AdCampaign>(`http://localhost:5001/api/AdCampaign/ad-campaign/${this.id}`)
          .subscribe({
            next: (response) => {
              this.model = response;
            }
          });
          console.log(this.model?.id);
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateBlogPostRequest: UpdateAdCampaignRequest =  {
        startDate: this.model.startDate,
        endDate: this.model.endDate,
        targetedViews: this.model.targetedViews,
        status: this.model.status,
        userId: this.model.userId
      };

      this.updateAdCampaignSubscription = this.http.put(`http://localhost:5001/api/AdCampaign/ad-campaign/${this.id}`, updateBlogPostRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('ad-campaigns')}
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteAdCampaignSubscription = this.http.delete(`http://localhost:5001/api/AdCampaign/ad-campaign/${this.id}`).subscribe({
        next: (response) => {
          this.router.navigateByUrl('ad-campaigns');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getAdCampaignSubscription?.unsubscribe();
    this.updateAdCampaignSubscription?.unsubscribe();
    this.deleteAdCampaignSubscription?.unsubscribe();
  }

}
