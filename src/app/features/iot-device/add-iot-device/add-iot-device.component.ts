import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddIotDeviceRequest } from '../models/add-iot-device-request.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Panel } from '../../panel/models/panel.model';

@Component({
  selector: 'app-add-iot-device',
  templateUrl: './add-iot-device.component.html',
  styleUrls: ['./add-iot-device.component.css']
})
export class AddIotDeviceComponent implements OnInit, OnDestroy {
  model: AddIotDeviceRequest;
  panels$?: Observable<Panel[]>;
  private AddIoTDeviceSubscription?: Subscription;

  constructor(private http : HttpClient, private router: Router) {
    this.model = {
      name: '',
      status: '',
      panelId: 0
    };
  }

  ngOnInit(): void {
    this.panels$ = this.http.get<Panel[]>("http://localhost:5001/api/Panel/panels");
  }

  onFormSubmit(): void {
    this.AddIoTDeviceSubscription = this.http.post("http://localhost:5001/api/IoTDevice/iot-device", this.model).subscribe({
      next: (response) => {this.router.navigateByUrl('iot-devices')}
    });
  }

  ngOnDestroy(): void {
    this.AddIoTDeviceSubscription?.unsubscribe();
  }
}