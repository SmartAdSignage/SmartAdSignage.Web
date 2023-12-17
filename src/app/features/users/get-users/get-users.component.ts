import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent {
  users$?: Observable<User[]>;
  deleteUserSubscription?: Subscription;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.users$ = this.http.get<User[]>("http://localhost:5001/api/User/users", {params: queryParams});
    this.users$.subscribe({
    next: (result: any) => this.users$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(email: string): void {
    this.deleteUserSubscription = this.http.delete(`http://localhost:5001/api/User/${email}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }
}
