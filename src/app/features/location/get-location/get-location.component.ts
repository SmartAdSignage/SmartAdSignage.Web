import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Location } from '../../location/models/location.model';

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.css']
})
export class GetLocationComponent {
  locations$?: Observable<Location[]>;
  deleteLocationSubscription?: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.locations$ = this.http.get<Location[]>("http://localhost:5001/api/Location/locations", {params: queryParams});
    this.locations$.subscribe({
    next: (result: any) => this.locations$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
    this.deleteLocationSubscription = this.http.delete(`http://localhost:5001/api/Location/location/${id}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }
}
