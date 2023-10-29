import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseService } from './database.service';
import { SqliteService } from './sqlite.service';
import { SQLiteConnection,CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { createTableImages, createTablePatient } from '../constants/queries';


export const createSchemaUsers: string = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT
);
`;

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

  async createUserTable(): Promise<any> {
    console.log(`going to create a connection`)
   this.db = await this.sqlite.createConnection('src\assets\databases\srvc.db', false, "no-encryption", 1,false);
    console.log(`db ${JSON.stringify(this.db)}`)
    await this.db.open();
    console.log(`after db.open`)
    const res: any = await this.db.execute(createSchemaUsers);
    console.log(`>>> res: ${JSON.stringify(res)}`)
    const resI0:any = await this.db.run("INSERT INTO users (name,email) VALUES ('Ackerman','ackerman@example.com') , ('Jefferson','jefferson@example.com');",[],true,'no');
    console.log(`>>> resI0: ${JSON.stringify(resI0)}`)
  }

  async createAllDBTables(): Promise<any> {
    console.log(`going to create a connection`)
   this.db = await this.sqlite.createConnection('DrCam.db', false, "no-encryption", 1,false);
   console.log(`Database created successfully...: ${JSON.stringify(this.db)}`)
   console.log(`${JSON.stringify(this.db)} Connecting database ....`)
   await this.db.open();
   console.log(`${JSON.stringify(this.db)} Database connected....`)
   const res1: any = await this.db.execute(createTablePatient);
   const res2: any = await this.db.execute(createTableImages);
   console.log(`>>> Patient table created successfully..: ${JSON.stringify(res1)}`);
   console.log(`>>> Image table created successfully..: ${JSON.stringify(res2)}`);
   console.log(`Inserting dummy data into database....`)
   const resI0:any = await this.db.run("INSERT INTO patients (PatientName) VALUES ('Samarth Trivedi') , ('Shivam Tomar'),('Mayank Yadav');",[],true,'no');
   console.log(`>>> Inserted data...: ${JSON.stringify(resI0)}`)
   const resI1:any = await this.db.run("INSERT INTO images (ImageName,Path) VALUES ('IMG1_Sam','C:\\Users\\HP\\OneDrive\\Pictures\\IMG1_Mady.jpg') , ('Shivam Tomar','C:\\Users\\HP\\OneDrive\\Pictures\\IMG1_Mady.jpg'),('Mayank Yadav','C:\\Users\\HP\\OneDrive\\Pictures\\IMG1_Mady.jpg');",[],true,'no');
   console.log(`>>> Inserted data...: ${JSON.stringify(resI0)}`)

  }

  public async executeQuery(query:string):Promise<Array<any>>{
  //   console.log(`going to create a connection`)
  //  this.db = await this.sqlite.createConnection('DrCam.db', false, "no-encryption", 1,false);
  //   console.log(`Database created successfully...: ${JSON.stringify(this.db)}`)
     console.log(`${JSON.stringify(this.db)} Connecting database ....`)
    await this.db.open();
    console.log(`${JSON.stringify(this.db)} Database connected....`)
    const response: any = await this.db.run(query);
    console.log(`>>> Patient table created successfully..: ${JSON.stringify(response)}`);
    await this.db.close();
    return response;
  }

}
