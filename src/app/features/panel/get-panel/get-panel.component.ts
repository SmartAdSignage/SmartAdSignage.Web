import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Panel } from '../models/panel.model';

@Component({
  selector: 'app-get-panel',
  templateUrl: './get-panel.component.html',
  styleUrls: ['./get-panel.component.css']
})
export class GetPanelComponent implements OnInit {
  panels$?: Observable<Panel[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 5);
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels", {params: queryParams});
    this.panels$.subscribe({
    next: (result: any) => this.panels$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

}
