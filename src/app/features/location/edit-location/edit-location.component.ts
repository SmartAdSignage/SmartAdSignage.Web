import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateLocationRequest } from '../models/edit-location-request.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit, OnDestroy {
  model?: Location;
  id: number | null = null;

  routeSubscription?: Subscription;
  getLocationSubscription?: Subscription;
  updateLocationSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getLocationSubscription = this.http.get<Location>(`http://localhost:5001/api/Location/location/${this.id}`)
          .subscribe({
            next: (response: any) => {
              this.model = response;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateLocationRequest: UpdateLocationRequest =  {
        country: this.model.country,
        city: this.model.city,
        street: this.model.street,
        streetType: this.model.streetType,
        buildingNumber: this.model.buildingNumber
      };

      this.updateLocationSubscription = this.http.put(`http://localhost:5001/api/Location/location/${this.id}`, updateLocationRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('locations')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getLocationSubscription?.unsubscribe();
    this.updateLocationSubscription?.unsubscribe();
  }

}
