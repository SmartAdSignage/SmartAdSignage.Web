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
import { GetUsersComponent } from './features/users/get-users/get-users.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { AddAdvertisementComponent } from './features/advertisement/add-advertisement/add-advertisement.component';
import { EditAdvertisementComponent } from './features/advertisement/edit-advertisement/edit-advertisement.component';
import { AddPanelComponent } from './features/panel/add-panel/add-panel.component';
import { EditPanelComponent } from './features/panel/edit-panel/edit-panel.component';
import { AddLocationComponent } from './features/location/add-location/add-location.component';
import { EditLocationComponent } from './features/location/edit-location/edit-location.component';
import { EditIotDeviceComponent } from './features/iot-device/edit-iot-device/edit-iot-device.component';
import { AddIotDeviceComponent } from './features/iot-device/add-iot-device/add-iot-device.component';
import { EditUserComponent } from './features/users/edit-user/edit-user.component';
import { AddQueueComponent } from './features/queues/add-queue/add-queue.component';
import { AddCampaignAdvertisementComponent } from './features/campaign-advertisement/add-campaign-advertisement/add-campaign-advertisement.component';
import { EditCampaignAdvertisementComponent } from './features/campaign-advertisement/edit-campaign-advertisement/edit-campaign-advertisement.component';
import { EditQueueComponent } from './features/queues/edit-queue/edit-queue.component';
import { GetFinishedAdCampaignsComponent } from './features/ad-campaign/get-finished-ad-campaigns/get-finished-ad-campaigns.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
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
  { path: 'edit-ad-campaign/:id', component: EditAdCampaignComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegistrationComponent },
  { path: 'add-advertisement', component: AddAdvertisementComponent, canActivate: [AuthGuard]},
  { path: 'edit-advertisement/:id', component: EditAdvertisementComponent, canActivate: [AuthGuard]},
  { path: 'add-panel', component: AddPanelComponent, canActivate: [AuthGuard]},
  { path: 'edit-panel/:id', component: EditPanelComponent, canActivate: [AuthGuard]},
  { path: 'add-location', component: AddLocationComponent, canActivate: [AuthGuard]},
  { path: 'edit-location/:id', component: EditLocationComponent, canActivate: [AuthGuard]},
  { path: 'add-iot-device', component: AddIotDeviceComponent, canActivate: [AuthGuard]},
  { path: 'edit-iot-device/:id', component: EditIotDeviceComponent, canActivate: [AuthGuard]},
  { path: 'users', 
  canActivate: [AuthGuard],
  children: [
    { path: '', component: GetUsersComponent },
    { path: 'edit-user/:email', component: EditUserComponent }
  ]},
  { path: 'add-queue', component: AddQueueComponent, canActivate: [AuthGuard]},
  { path: 'edit-queue/:id', component: EditQueueComponent, canActivate: [AuthGuard]},
  { path: 'add-campaign-advertisement', component: AddCampaignAdvertisementComponent, canActivate: [AuthGuard]},
  { path: 'edit-campaign-advertisement/:id', component: EditCampaignAdvertisementComponent, canActivate: [AuthGuard]},
  { path: 'get-finished-ad-campaigns', component: GetFinishedAdCampaignsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }