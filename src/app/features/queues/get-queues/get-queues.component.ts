import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
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
    queryParams = queryParams.append("pageInfo.size", 10);
    this.queues$ = this.http.get<Queue[]>("http://localhost:5001/api/Queue/queues", {params: queryParams}).pipe(
      map((response: any) => {
        return response.map((queue: any) => {
          const panelId = queue.panel?.id;
          const advertisementId = queue.advertisement?.id;
          return {
            id: queue.id,
            displayOrder: queue.displayOrder,
            panelId: panelId,
            advertisementId: advertisementId,
          } as any;
        });
      })
    );
    this.queues$.subscribe({
    next: (result: any) => this.queues$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
    this.http.delete(`http://localhost:5001/api/Queue/queue/${id}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }
}
