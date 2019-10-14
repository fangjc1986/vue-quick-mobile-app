import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import setting from "../setting";

const adapter = new LocalStorage(`${setting.package.name}-${setting.package.version}`);
let db = low(adapter);

export default db;