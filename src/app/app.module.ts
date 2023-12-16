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
    GetQueuesComponent
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
