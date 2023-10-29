import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Patient } from "../models/patient.model";
import { DatabaseService } from "../services/database.service";
import { Injectable } from "@angular/core";
import { MigrationService } from "../services/migration.service";

@Injectable()
export class Patientrepository {

    constructor(private migrationService:MigrationService){}

    async getPatients(): Promise<Patient[]> {
       return await this.migrationService.executeQuery("select * from patients");
      }
}
