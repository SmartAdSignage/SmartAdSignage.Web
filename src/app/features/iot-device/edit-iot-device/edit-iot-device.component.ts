import { Component, OnDestroy, OnInit } from '@angular/core';
import { IotDevice } from '../models/iot-device.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Panel } from '../../panel/models/panel.model';
import { UpdateIotDeviceRequest } from '../models/edit-iot-device-request.model';

@Component({
  selector: 'app-edit-iot-device',
  templateUrl: './edit-iot-device.component.html',
  styleUrls: ['./edit-iot-device.component.css']
})
export class EditIotDeviceComponent implements OnInit, OnDestroy {
  model?: IotDevice;
  id: number | null = null;
  panels$?: Observable<Panel[]>;
  selectedPanel?: number;

  routeSubscription?: Subscription;
  getIoTDeviceSubscription?: Subscription;
  updateIoTDeviceSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels");

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getIoTDeviceSubscription = this.http.get<IotDevice>(`http://localhost:5001/api/IoTDevice/iot-device/${this.id}`)
          .subscribe({
            next: (response: any) => {
              response.panelId = response.panel?.id;
              this.model = response;
              this.selectedPanel = this.model?.panelId;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updatePanelRequest: UpdateIotDeviceRequest =  {
        name: this.model.name,
        status: this.model.status,
        panelId: this.selectedPanel ?? 0
      };

      this.updateIoTDeviceSubscription = this.http.put(`http://localhost:5001/api/IoTDevice/iot-device/${this.id}`, updatePanelRequest).subscribe({
        next: (response) => {this.router.navigateByUrl('iot-devices')}
      });
    }
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getIoTDeviceSubscription?.unsubscribe();
    this.updateIoTDeviceSubscription?.unsubscribe();
  }

}