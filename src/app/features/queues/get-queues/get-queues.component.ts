import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Queue } from '../models/queue.model';

@Component({
  selector: 'app-get-queues',
  templateUrl: './get-queues.component.html',
  styleUrls: ['./get-queues.component.css']
})
export class GetQueuesComponent {
  queues$?: Observable<Queue[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 5);
    this.queues$ = this.http.get<Queue[]>("http://localhost:5001/api/Queue/queues", {params: queryParams});
    this.queues$.subscribe({
    next: (result: any) => this.queues$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }
}
