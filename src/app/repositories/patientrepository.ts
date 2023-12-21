import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Patient } from "../models/patient.model";
import { DatabaseService } from "../services/database.service";
import { Injectable } from "@angular/core";
import { MigrationService } from "../services/migration.service";

@Injectable()
export class Patientrepository {

    constructor(private migrationService: MigrationService, private _databaseService:DatabaseService) { }

    async getPatients(): Promise<Patient[]> {
        let data = await this.migrationService.executeQuery("select * from patients");
        return data.values as Patient[];
    }

    async addPatient(patient: Patient):Promise<Patient>{
        const blobBuffer = new FileReader();
        let sqlcmd: string = "insert into patients (FirstName,LastName,Gender,DateOfBirth,MobileNo,Address,Image)values (?, ?, ?, ?, ?, ?,?)";
        let values: Array<any> = [patient.firstName, patient.lastName, patient.gender, patient.dateOfBirth, patient.mobileNo, patient.address,patient.Image];
        let persist:any= this.migrationService.insertQuery(sqlcmd,values);
       
        if(persist!=undefined && persist!=null){
        return  persist as Patient;
       }else{
        throw Error('Add Patient failed');
       }
    }

}
