import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddPanelRequest } from '../models/add-panel-request.model';
import { Panel } from '../models/panel.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../users/models/user.model';
import { Location } from '../../location/models/location.model';

@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent implements OnInit, OnDestroy {
  model: AddPanelRequest;
  users$?: Observable<User[]>;
  locations$?: Observable<Location[]>;
  private AddPanelSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      width: 0,
      height: 0,
      brightness: 0,
      status: '',
      latitude: 0,
      longitude: 0,
      userId: '',
      locationId: 0
    };
  }

  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");
    this.locations$ = this.http.get<Location[]>("http://localhost:5001/api/Location/locations");
  }

  onFormSubmit(): void {
    this.AddPanelSubscription = this.http.post("http://localhost:5001/api/Panel/panel", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('panels')}
    });
  }

  ngOnDestroy(): void {
    this.AddPanelSubscription?.unsubscribe();
  }
}
