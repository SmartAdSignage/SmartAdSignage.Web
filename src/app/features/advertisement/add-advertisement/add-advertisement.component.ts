import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddAdCampaignRequest } from '../../ad-campaign/models/add-ad-campaign-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AddAdvertisementRequest } from '../models/add-advertisement-request.model';
import { User } from '../../users/models/user.model';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit, OnDestroy {
  model: AddAdvertisementRequest;
  users$?: Observable<User[]>;
  private AddAdvertisementSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      title: '',
      type: '',
      file: '',
      userId: ''
    };
  }

  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");
  }

  onFormSubmit(): void {
    this.AddAdvertisementSubscription = this.http.post("http://localhost:5001/api/Advertisement/advertisement", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('advertisements')}
    });
  }

  ngOnDestroy(): void {
    this.AddAdvertisementSubscription?.unsubscribe();
  }
}

