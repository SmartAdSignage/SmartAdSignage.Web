import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { Panel } from '../models/panel.model';

@Component({
  selector: 'app-get-panel',
  templateUrl: './get-panel.component.html',
  styleUrls: ['./get-panel.component.css']
})
export class GetPanelComponent implements OnInit {
  panels$?: Observable<Panel[]>;
  deletePanelSubscription?: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels", {params: queryParams}).pipe(
      map((response: any) => {
        return response.map((panel: any) => {
          const userId = panel.user?.id;// Access userId property of user
          const locationId = panel.location?.id; // Access userId property of user
          return {
            id: panel.id,
            height: panel.height,
            width: panel.width,
            brightness: panel.brightness,
            status: panel.status,
            latitude: panel.latitude,
            longitude: panel.longitude,
            userId: userId,
            locationId: locationId
          } as any;
        });
      })
    );;
    this.panels$.subscribe({
    next: (result: any) => this.panels$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
    this.deletePanelSubscription = this.http.delete(`http://localhost:5001/api/Panel/panel/${id}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }

}
