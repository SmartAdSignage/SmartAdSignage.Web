import { Component } from '@angular/core';
import { IotDevice } from '../models/iot-device.model';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, map, of } from 'rxjs';
import { AdCampaign } from '../../ad-campaign/models/ad-campaign.model';

@Component({
  selector: 'app-get-iot-devices',
  templateUrl: './get-iot-devices.component.html',
  styleUrls: ['./get-iot-devices.component.css']
})
export class GetIotDevicesComponent {
  iotDevices$?: Observable<IotDevice[]>;
  deleteIotDeviceSubscription?: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 10);
    this.iotDevices$ = this.http.get<IotDevice[]>("http://localhost:5001/api/IoTDevice/iot-devices", {params: queryParams})
    .pipe(
      map((response: any) => {
        return response.map((ioTDevice: any) => {
          const panelId = ioTDevice.panel?.id;
          return {
            id: ioTDevice.id,
            name: ioTDevice.name,
            status: ioTDevice.status,
            panelId: panelId,
          } as any;
        });
      })
    );
    this.iotDevices$.subscribe({
    next: (result: any) => this.iotDevices$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

  onDelete(id: number): void {
    this.deleteIotDeviceSubscription = this.http.delete(`http://localhost:5001/api/IoTDevice/iot-device/${id}`).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }
}
