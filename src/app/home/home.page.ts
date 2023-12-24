import { AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { MigrationService } from '../services/migration.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage implements OnInit {



  constructor(private router: Router,
    private migrateService: MigrationService) { }
  ngOnInit(): void {

  }


  openFirstMenu() {
    this.router.navigate(['/home']);
  }

  Camera() {
    this.router.navigate(['/home/camera']);
  }

  patientHistory() {
    this.router.navigate(['/home/patients']);
  }
  
  downloadDatabase() {
    this.migrateService.saveDatabaseLocally();
  }

}
