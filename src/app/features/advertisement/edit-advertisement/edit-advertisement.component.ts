import { Component, OnDestroy, OnInit } from '@angular/core';
import { Advertisement } from '../models/advertisement.model';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../users/models/user.model';
import { UpdateAdvertisementRequest } from '../models/edit-advertisement-request.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-advertisement',
  templateUrl: './edit-advertisement.component.html',
  styleUrls: ['./edit-advertisement.component.css']
})
export class EditAdvertisementComponent implements OnInit, OnDestroy {
  model?: Advertisement;
  id: number | null = null;
  users$?: Observable<User[]>;
  selectedUser?: string;

  routeSubscription?: Subscription;
  getAdvertisementSubscription?: Subscription;
  updateAdvertisementSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getAdvertisementSubscription = this.http.get<Advertisement>(`http://localhost:5001/api/Advertisement/advertisement/${this.id}`)
          .subscribe({
            next: (response: any) => {
              console.log(response);
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
      var updateAdvertisementRequest: UpdateAdvertisementRequest =  {
        title: this.model.title,
        type: this.model.type,
        file: this.model.file,
        userId: this.selectedUser ?? ''
      };

      this.updateAdvertisementSubscription = this.http.put(`http://localhost:5001/api/Advertisement/advertisement/${this.id}`, updateAdvertisementRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('advertisements')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getAdvertisementSubscription?.unsubscribe();
    this.updateAdvertisementSubscription?.unsubscribe();
  }

}
