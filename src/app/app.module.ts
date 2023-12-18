import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/components/home/home.component';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { BackupComponent } from './features/database/backup/backup.component';
import { GetPanelComponent } from './features/panel/get-panel/get-panel.component';
import { GetAdvertisementComponent } from './features/advertisement/get-advertisement/get-advertisement.component';
import { GetCampaignAdComponent } from './features/campaign-advertisement/get-campaign-ad/get-campaign-ad.component';
import { GetLocationComponent } from './features/location/get-location/get-location.component';
import { GetIotDevicesComponent } from './features/iot-device/get-iot-devices/get-iot-devices.component';
import { GetAdCampaignsComponent } from './features/ad-campaign/get-ad-campaigns/get-ad-campaigns.component';
import { GetQueuesComponent } from './features/queues/get-queues/get-queues.component';
import { AddAdCampaignComponent } from './features/ad-campaign/add-ad-campaign/add-ad-campaign.component';
import { EditAdCampaignComponent } from './features/ad-campaign/edit-ad-campaign/edit-ad-campaign.component';
import { GetUsersComponent } from './features/users/get-users/get-users.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { AddAdvertisementComponent } from './features/advertisement/add-advertisement/add-advertisement.component';
import { EditAdvertisementComponent } from './features/advertisement/edit-advertisement/edit-advertisement.component';
import { AddPanelComponent } from './features/panel/add-panel/add-panel.component';
import { EditPanelComponent } from './features/panel/edit-panel/edit-panel.component';
import { AddLocationComponent } from './features/location/add-location/add-location.component';
import { EditLocationComponent } from './features/location/edit-location/edit-location.component';
import { AddIotDeviceComponent } from './features/iot-device/add-iot-device/add-iot-device.component';
import { EditIotDeviceComponent } from './features/iot-device/edit-iot-device/edit-iot-device.component';
import { EditUserComponent } from './features/users/edit-user/edit-user.component';
import { AddQueueComponent } from './features/queues/add-queue/add-queue.component';
import { EditQueueComponent } from './features/queues/edit-queue/edit-queue.component';
import { AddCampaignAdvertisementComponent } from './features/campaign-advertisement/add-campaign-advertisement/add-campaign-advertisement.component';
import { EditCampaignAdvertisementComponent } from './features/campaign-advertisement/edit-campaign-advertisement/edit-campaign-advertisement.component';
import { GetFinishedAdCampaignsComponent } from './features/ad-campaign/get-finished-ad-campaigns/get-finished-ad-campaigns.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    BackupComponent,
    GetPanelComponent,
    GetAdvertisementComponent,
    GetCampaignAdComponent,
    GetLocationComponent,
    GetIotDevicesComponent,
    GetAdCampaignsComponent,
    GetQueuesComponent,
    AddAdCampaignComponent,
    EditAdCampaignComponent,
    GetUsersComponent,
    RegistrationComponent,
    AddAdvertisementComponent,
    EditAdvertisementComponent,
    AddPanelComponent,
    EditPanelComponent,
    AddLocationComponent,
    EditLocationComponent,
    AddIotDeviceComponent,
    EditIotDeviceComponent,
    EditUserComponent,
    AddQueueComponent,
    EditQueueComponent,
    AddCampaignAdvertisementComponent,
    EditCampaignAdvertisementComponent,
    GetFinishedAdCampaignsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
