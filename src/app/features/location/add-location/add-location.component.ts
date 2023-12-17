import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddLocationRequest } from '../models/add-location-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit, OnDestroy {
  model: AddLocationRequest;
  private AddPanelSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      country: '',
      city: '',
      street: '',
      streetType: '',
      buildingNumber: ''
    };
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    this.AddPanelSubscription = this.http.post("http://localhost:5001/api/Location/location", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('locations')}
    });
  }

  ngOnDestroy(): void {
    this.AddPanelSubscription?.unsubscribe();
  }
}
