import { DatabaseSync } from "node:sqlite";
import {readFileSync} from "node:fs";
export const database=new DatabaseSync(process.env.SLOVENIJA_DB);
database.exec("PRAGMA journal_mode=WAL");
database.exec("PRAGMA busy_timeout=5000");
database.exec("BEGIN IMMEDIATE");
try {
 if(!database.prepare("SELECT name FROM sqlite_master WHERE name='trade_cases'").get()){
  database.exec(readFileSync(new URL("./schema.sql",import.meta.url),"utf8"));
 }
 database.exec("CREATE TABLE IF NOT EXISTS access_sessions (digest TEXT PRIMARY KEY, identity TEXT NOT NULL, expires INTEGER NOT NULL)");
 database.exec("COMMIT");
}catch(error){database.exec("ROLLBACK");throw error;}
export const env={DB:{prepare(sql){
 const st=database.prepare(sql);
 function bind(...params){return {bind,async all(){return {results:st.all(...params)}},async raw(){st.setReturnArrays(true);return st.all(...params)},async run(){return st.run(...params)}};}
 return bind();
}}};
