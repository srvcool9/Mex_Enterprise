import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeButton = 'home';
  constructor(private router: Router, private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.dataSharing.getActiveButton().subscribe((res)=>{
      this.activeButton = res;
    })
  }

  openFirstMenu() {
    this.router.navigate(['/home']);
    this.dataSharing.setActiveButton('home');
    this.activeButton = 'home';
  }

  Camera() {

    this.router.navigate(['/home/camera']);
    this.activeButton = 'camera';
  }

  patientHistory() {

    this.router.navigate(['/home/patients']);
    this.activeButton = 'history';
  }

  openSettings() {
    this.router.navigate(['/home/settings']);
    this.activeButton = 'settings';
  }

  logout() {
    this.router.navigate(['/login'])
    this.activeButton = 'logout';
  }

}
