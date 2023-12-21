
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';



export const createSchemaUsers: string = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT
);
`;

if (environment.production) {
  enableProdMode();
}

pwaElements(window);
jeepSqlite(window);
window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  try {
    if(platform === "web") {
      console.log('in index.ts')
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
      await customElements.whenDefined('jeep-sqlite');
      console.log('in index.ts after customElements')
      await sqlite.initWebStore();
      console.log('after sqlite.initWebStore()');
       const db = await sqlite.createConnection('srvc.db', false, "no-encryption", 1,false);
      console.log(`db ${JSON.stringify(db)}`)
      await db.open();
      console.log(`after db.open`)
      const res: any = await db.execute(createSchemaUsers);
      console.log(`>>> res: ${JSON.stringify(res)}`)
      const resI0:any = await db.run("INSERT INTO users (name,email) VALUES ('Ackerman','ackerman@example.com') , ('Jefferson','jefferson@example.com');",[],true,'no');
      console.log(`>>> resI0: ${JSON.stringify(resI0)}`)
      const resQ1: any = await db.query('SELECT * FROM users;');
    console.log(`>>> select query: ${JSON.stringify(resQ1)}`)

    }else{console.log('in index.ts')
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    jeepEl.autoSave = true;
    await customElements.whenDefined('jeep-sqlite');
    console.log('in index.ts after customElements')
    await sqlite.initWebStore();
    console.log('after sqlite.initWebStore()');
     const db = await sqlite.createConnection('srvc.db', false, "no-encryption", 1,false);
    console.log(`db ${JSON.stringify(db)}`)
    await db.open();
    console.log(`after db.open`)
    const res: any = await db.execute(createSchemaUsers);
    console.log(`>>> res: ${JSON.stringify(res)}`)
    const resI0:any = await db.run("INSERT INTO users (name,email) VALUES ('Ackerman','ackerman@example.com') , ('Jefferson','jefferson@example.com');",[],true,'no');
    console.log(`>>> resI0: ${JSON.stringify(resI0)}`)
    const resQ1: any = await db.query('SELECT * FROM users;');
  console.log(`>>> select query: ${JSON.stringify(resQ1)}`)}
    await sqlite.checkConnectionsConsistency();

    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }

});