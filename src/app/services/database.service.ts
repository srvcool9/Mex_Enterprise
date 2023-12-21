import {  Injectable } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

interface SQLiteDBConnectionCallback<T> { (myArguments: SQLiteDBConnection): T }

@Injectable({
  providedIn: 'root'
})

//const DB_USERS = 'myuserdb';

export class DatabaseService {
  private db: SQLiteDBConnection;

  constructor(private sqlite: SqliteService) {
    
  }

  /**
   * this function will handle the sqlite isopen and isclosed automatically for you.
   * @param callback: The callback function that will execute multiple SQLiteDBConnection commands or other stuff.
   * @param databaseName optional another database name
   * @returns any type you want to receive from the callback function.
   */
  async executeQuery<T>(callback: SQLiteDBConnectionCallback<T>, databaseName: string = 'DrCam'): Promise<T> {
    try {
      let isConnection = await this.sqlite.isConnection(databaseName);

      if (isConnection.result) {
        let db = await this.sqlite.retrieveConnection(databaseName);
        return await callback(db);
      }
      else {
        const db = await this.sqlite.createConnection(databaseName, false, "no-encryption", 1);
        await db.open();
        let cb = await callback(db);
        await this.sqlite.closeConnection(databaseName);
        return cb;
      }
    } catch (error) {
      throw Error(`DatabaseServiceError: ${error}`);
    }
  }

  
}
