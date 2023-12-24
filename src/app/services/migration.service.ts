import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseService } from './database.service';
import { SqliteService } from './sqlite.service';
import { SQLiteConnection,CapacitorSQLite, SQLiteDBConnection, DBSQLiteValues } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import {  createTablePatient } from '../constants/queries';



interface SQLiteDBConnectionCallback<T> { (myArguments: SQLiteDBConnection): T }

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
 private sqlite: SQLiteConnection;
 isService: boolean = false;
 platform: string;
 sqlitePlugin: any;
 native: boolean = false;
  db:any;
 
 initializePlugin(): Promise<boolean> {
  return new Promise (resolve => {
      this.platform = Capacitor.getPlatform();
      if(this.platform === 'ios' || this.platform === 'android') this.native = true;
      this.sqlitePlugin = CapacitorSQLite;
      this.sqlite = new SQLiteConnection(this.sqlitePlugin);
      this.isService = true;
      resolve(true);
  });
}
  constructor(private sqliteService: SqliteService, private databaseService: DatabaseService) {
    this.initializePlugin();
    this.createAllDBTables();
   }

   saveDatabaseLocally():Promise<any>{
    return this.sqlite.saveToLocalDisk("DrCam");
   }

  async createAllDBTables(): Promise<any> {
    try{
    console.log(`going to create a connection`)

   this.db = await this.sqlite.createConnection('DrCam.db', false, "no-encryption", 1,false);
   console.log(`Database created successfully...: ${JSON.stringify(this.db)}`)
   console.log(`${JSON.stringify(this.db)} Connecting database ....`)
   await this.db.open();
   console.log(`${JSON.stringify(this.db)} Database connected....`)
   const res1: any = await this.db.execute(createTablePatient);
   console.log(`>>> Patient table created successfully..: ${JSON.stringify(res1)}`);
   console.log(`Inserting dummy data into database....`)
   const resI0:any = await this.db.run("INSERT INTO patients (FirstName,LastName,Gender,DateOfBirth,MobileNo,Address) VALUES ('Samarth','Trivedi','Male','28-08-1996','9575455117','Bhopal');",[],true,'no');
   console.log(`>>> Inserted dummy patient data...: ${JSON.stringify(resI0)}`)
   console.log(`>>> All Db...: ${JSON.stringify(this.sqlite.getDatabaseList())}`)
   let path:string="D:\\Mex_Enterprise"
   let Db:string[]=[];
   Db.push("DrCam.db")
   console.log(this.sqlite.isConnection("DrCam.db",true));

    }catch (error) {
      throw Error(`DatabaseServiceError: ${error}`);
    }

  }



  public async executeQuery(query:string):Promise<DBSQLiteValues>{

    try{
     console.log(`${JSON.stringify(this.db)} Connecting database ....`)
    await this.db.open();
    console.log(`${JSON.stringify(this.db)} Database connected....`)
    var data: DBSQLiteValues = await this.db.query(query);
    console.log(`>>> Patient table created successfully..: ${JSON.stringify(data)}`);
    await this.db.close();
    return data;
  }catch (error) {
    throw Error(`DatabaseServiceError: ${error}`);
  }
  }
  public async insertQuery(query:string,values:Array<any>):Promise<Object>{
    try{
     console.log(`${JSON.stringify(this.db)} Connecting database ....`)
    await this.db.open();
    console.log(`${JSON.stringify(this.db)} Database connected....`)
    const response: any = await this.db.run(query,values);
    console.log(`>>> data inserted successfully..: ${JSON.stringify(response)}`);
    await this.db.close();
    return response.changes as Object;
  }catch (error) {
    throw Error(`DatabaseServiceError: ${error}`);
  }
    
  }

}
