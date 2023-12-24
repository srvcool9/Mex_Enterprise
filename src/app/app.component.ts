import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SqliteService } from './services/sqlite.service';
import { MigrationService } from './services/migration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private migrateService:MigrationService,private sqlite:SqliteService) {
  }
}
