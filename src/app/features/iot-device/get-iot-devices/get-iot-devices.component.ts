import { Component } from '@angular/core';
import { IotDevice } from '../models/iot-device.model';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AdCampaign } from '../../ad-campaign/models/ad-campaign.model';

@Component({
  selector: 'app-get-iot-devices',
  templateUrl: './get-iot-devices.component.html',
  styleUrls: ['./get-iot-devices.component.css']
})
export class GetIotDevicesComponent {
  iotDevices$?: Observable<IotDevice[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 5);
    this.iotDevices$ = this.http.get<IotDevice[]>("http://localhost:5001/api/IoTDevice/iot-devices", {params: queryParams});
    this.iotDevices$.subscribe({
    next: (result: any) => this.iotDevices$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }
}
