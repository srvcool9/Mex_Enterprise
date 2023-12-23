import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SQLiteObject } from '@ionic-native/sqlite';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabaseService } from './services/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Patientrepository } from './repositories/patientrepository';
import { LoginComponent } from './view/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent,LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Patientrepository],
  bootstrap: [AppComponent],
})
export class AppModule {}
