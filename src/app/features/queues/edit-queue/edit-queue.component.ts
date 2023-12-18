import { Component, OnDestroy, OnInit } from '@angular/core';
import { Queue } from '../models/queue.model';
import { UpdateQueueRequest } from '../models/edit-queue-request.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Advertisement } from '../../advertisement/models/advertisement.model';
import { IotDevice } from '../../iot-device/models/iot-device.model';
import { Panel } from '../../panel/models/panel.model';

@Component({
  selector: 'app-edit-queue',
  templateUrl: './edit-queue.component.html',
  styleUrls: ['./edit-queue.component.css']
})
export class EditQueueComponent implements OnInit, OnDestroy {
  model?: Queue;
  id: number | null = null;
  panels$?: Observable<Panel[]>;
  advertisements$?: Observable<Advertisement[]>;
  selectedPanel?: number;
  selectedAdvertisement?: number;

  routeSubscription?: Subscription;
  getQueueSubscription?: Subscription;
  updateQueueSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels");
    this.advertisements$ = this.http.get<Advertisement[]>("http://localhost:5001/api/Advertisement/advertisements");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getQueueSubscription = this.http.get<Queue>(`http://localhost:5001/api/Queue/queue/${this.id}`)
          .subscribe({
            next: (response: any) => {
              response.panelId = response.panel?.id;
              response.advertisementId = response.advertisement?.id;
              this.model = response;
              this.selectedPanel = this.model?.panelId;
              this.selectedAdvertisement = this.model?.advertisementId;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateQueueRequest: UpdateQueueRequest =  {
        displayOrder: this.model.displayOrder,
        advertisementId: this.selectedAdvertisement ?? 0,
        panelId: this.selectedPanel ?? 0
      };

      this.updateQueueSubscription = this.http.put(`http://localhost:5001/api/Queue/queue/${this.id}`, updateQueueRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('queues')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getQueueSubscription?.unsubscribe();
    this.updateQueueSubscription?.unsubscribe();
  }

}
