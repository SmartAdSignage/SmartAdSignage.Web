import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddQueueRequest } from '../models/add-queue-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Advertisement } from '../../advertisement/models/advertisement.model';
import { Panel } from '../../panel/models/panel.model';

@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.css']
})
export class AddQueueComponent implements OnInit, OnDestroy {
  model: AddQueueRequest;
  panels$?: Observable<Panel[]>;
  advertisements$?: Observable<Advertisement[]>;
  private AddQueueSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      displayOrder: 0,
      advertisementId: 0,
      panelId: 0
    };
  }

  ngOnInit(): void {
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels");
    this.advertisements$ = this.http.get<Advertisement[]>("http://localhost:5001/api/Advertisement/advertisements");
  }

  onFormSubmit(): void {
    this.AddQueueSubscription = this.http.post("http://localhost:5001/api/Queue/queue", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('queues')}
    });
  }

  ngOnDestroy(): void {
    this.AddQueueSubscription?.unsubscribe();
  }
}
