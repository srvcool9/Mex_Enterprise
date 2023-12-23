import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CameraComponent } from './camera/camera.component';
import { PatientsComponent } from './patients/patients.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }, {
    path: 'camera',
    component: CameraComponent

  },
  {
    path: 'patients',
    component: PatientsComponent

  },
  {
    path: 'settings',
    component: SettingsComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
