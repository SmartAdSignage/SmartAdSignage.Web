import { Component, OnDestroy, OnInit } from '@angular/core';
import { Panel } from '../models/panel.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../users/models/user.model';
import { UpdatePanelRequest } from '../models/edit-panel-request.model';
import { Location } from '../../location/models/location.model';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.css']
})
export class EditPanelComponent implements OnInit, OnDestroy {
  model?: Panel;
  id: number | null = null;
  users$?: Observable<User[]>;
  locations$?: Observable<Location[]>;
  selectedUser?: string;
  selectedLocation?: number;

  routeSubscription?: Subscription;
  getPanelSubscription?: Subscription;
  updatePanelSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");
    this.locations$ = this.http.get<Location[]>("http://localhost:5001/api/Location/locations");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getPanelSubscription = this.http.get<Panel>(`http://localhost:5001/api/Panel/panel/${this.id}`)
          .subscribe({
            next: (response: any) => {
              response.userId = response.user?.id;
              response.locationId = response.location?.id;
              this.model = response;
              this.selectedUser = this.model?.userId;
              this.selectedLocation = this.model?.locationId;
              console.log(this.selectedUser);
              console.log(this.selectedLocation);
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updatePanelRequest: UpdatePanelRequest =  {
        width: this.model.width,
        height: this.model.height,
        brightness: this.model.brightness,
        status: this.model.status,
        latitude: this.model.latitude,
        longitude: this.model.longitude,
        userId: this.selectedUser ?? '',
        locationId: this.selectedLocation ?? 0
      };

      this.updatePanelSubscription = this.http.put(`http://localhost:5001/api/Panel/panel/${this.id}`, updatePanelRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('panels')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getPanelSubscription?.unsubscribe();
    this.updatePanelSubscription?.unsubscribe();
  }

}
