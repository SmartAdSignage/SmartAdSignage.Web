import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Panel } from '../../panel/models/panel.model';
import { UpdateUserRequest } from '../models/edit-user-request.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  model?: User;
  email: string | null = null;

  routeSubscription?: Subscription;
  getUserSubscription?: Subscription;
  updateUserSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.email = params.get('email');
        if (this.email) {
          this.getUserSubscription = this.http.get<Panel>(`http://localhost:5001/api/User/${this.email}`)
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
    if (this.model && this.email) {
      var updateUserRequest: UpdateUserRequest =  {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        companyName: this.model.companyName,
        email: this.model.email,
      };

      this.updateUserSubscription = this.http.put(`http://localhost:5001/api/User/${this.email}`, updateUserRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('users')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
    this.updateUserSubscription?.unsubscribe();
  }

}