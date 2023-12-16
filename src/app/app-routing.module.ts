import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/auth/services/auth-guard.service';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { BackupComponent } from './features/database/backup/backup.component';
import { GetPanelComponent } from './features/panel/get-panel/get-panel.component';
import { GetAdvertisementComponent } from './features/advertisement/get-advertisement/get-advertisement.component';
import { GetCampaignAdComponent } from './features/campaign-advertisement/get-campaign-ad/get-campaign-ad.component';
import { GetLocationComponent } from './features/location/get-location/get-location.component';
import { GetAdCampaignsComponent } from './features/ad-campaign/get-ad-campaigns/get-ad-campaigns.component';
import { GetIotDevicesComponent } from './features/iot-device/get-iot-devices/get-iot-devices.component';
import { GetQueuesComponent } from './features/queues/get-queues/get-queues.component';
import { AddAdCampaignComponent } from './features/ad-campaign/add-ad-campaign/add-ad-campaign.component';
import { EditAdCampaignComponent } from './features/ad-campaign/edit-ad-campaign/edit-ad-campaign.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ad-campaigns', component: GetAdCampaignsComponent, canActivate: [AuthGuard] },
  { path: 'backup', component: BackupComponent, canActivate: [AuthGuard]},
  { path: 'panels', component: GetPanelComponent, canActivate: [AuthGuard]},
  { path: 'advertisements', component: GetAdvertisementComponent, canActivate: [AuthGuard]},
  { path: 'campaign-ads', component: GetCampaignAdComponent, canActivate: [AuthGuard]},
  { path: 'locations', component: GetLocationComponent, canActivate: [AuthGuard]},
  { path: 'iot-devices', component: GetIotDevicesComponent, canActivate: [AuthGuard]},
  { path: 'queues', component: GetQueuesComponent, canActivate: [AuthGuard]},
  { path: 'add-ad-campaign', component: AddAdCampaignComponent, canActivate: [AuthGuard]},
  { path: 'edit-ad-campaign/:id', component: EditAdCampaignComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }