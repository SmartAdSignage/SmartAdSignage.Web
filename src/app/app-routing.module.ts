import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/auth/services/auth-guard.service';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { GetAdCampaignComponent } from './features/ad-campaign/get-ad-campaign/get-ad-campaign.component';
import { BackupComponent } from './features/database/backup/backup.component';
import { GetPanelComponent } from './features/panel/get-panel/get-panel.component';
import { GetAdvertisementComponent } from './features/advertisement/get-advertisement/get-advertisement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ad-campaigns', component: GetAdCampaignComponent, canActivate: [AuthGuard] },
  { path: 'backup', component: BackupComponent, canActivate: [AuthGuard]},
  { path: 'panels', component: GetPanelComponent, canActivate: [AuthGuard]},
  { path: 'advertisements', component: GetAdvertisementComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }