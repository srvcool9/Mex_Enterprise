import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Patientrepository } from '../repositories/patientrepository';
import { PatientsComponent } from './patients/patients.component';
import { CameraComponent } from './camera/camera.component';
import { Imagerepository } from '../repositories/imagerepository';
import { HeaderComponent } from '../shared/header/header.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PatientsComponent, CameraComponent, HeaderComponent],
  providers: [Patientrepository,Imagerepository]
})
export class HomePageModule { }
