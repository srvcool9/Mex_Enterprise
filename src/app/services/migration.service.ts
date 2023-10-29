import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseService } from './database.service';
import { SqliteService } from './sqlite.service';
import { SQLiteConnection,CapacitorSQLite } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';


export const createSchemaUsers: string = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT
);
`;

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
 private sqlite: SQLiteConnection;
 isService: boolean = false;
 platform: string;
 sqlitePlugin: any;
 native: boolean = false;
 
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
    this.createUserTable();
   }

  async createUserTable(): Promise<any> {
    console.log(`going to create a connection`)
   const db = await this.sqlite.createConnection('src\assets\databases\srvc.db', false, "no-encryption", 1,false);
    console.log(`db ${JSON.stringify(db)}`)
    await db.open();
    console.log(`after db.open`)
    const res: any = await db.execute(createSchemaUsers);
    console.log(`>>> res: ${JSON.stringify(res)}`)
    const resI0:any = await db.run("INSERT INTO users (name,email) VALUES ('Ackerman','ackerman@example.com') , ('Jefferson','jefferson@example.com');",[],true,'no');
    console.log(`>>> resI0: ${JSON.stringify(resI0)}`)
  }
}
