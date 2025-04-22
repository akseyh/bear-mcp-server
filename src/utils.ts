import sqlite3 from "sqlite3";
import path from "path";
import os from "os";
import dotenv from 'dotenv'
dotenv.config()

type Note = {
  ZCREATIONDATE: number;
  ZSUBTITLE: string;
  ZTEXT: string;
  ZTITLE: string;
  ZUNIQUEIDENTIFIER: string;
};

type Tag = {
  ZTITLE: string;
};

const bearDBPath = process.env.DB_ROUTE || path.join(
  os.homedir(),
  "Library",
  "Group Containers",
  "9K33E3U3T4.net.shinyfrog.bear",
  "Application Data",
  "database.sqlite"
);

const db = new sqlite3.Database(bearDBPath);

export function getNotes() {
  return new Promise((resolve, reject) => {
    const notes: Note[] = [];

    db.each(
      "SELECT * FROM ZSFNOTE WHERE ZARCHIVED=0;",
      (error, row: Note) => {
        if (!error) {
          notes.push({
            ZCREATIONDATE: row.ZCREATIONDATE,
            ZSUBTITLE: row.ZSUBTITLE,
            ZTEXT: row.ZTEXT,
            ZTITLE: row.ZTITLE,
            ZUNIQUEIDENTIFIER: row.ZUNIQUEIDENTIFIER,
          });
        }
      },
      (error, count) => {
        if (error) reject(error);

        resolve(notes);
      }
    );
  });
}

export function getNotesLike(like: string) {
  return new Promise((resolve, reject) => {
    const notes: Note[] = [];

    db.each(
      `SELECT * FROM ZSFNOTE WHERE ZARCHIVED=0 AND (ZTEXT LIKE '%${like}%' OR ZTITLE LIKE '%${like}%');`,
      (error, row: Note) => {
        if (!error) {
          notes.push({
            ZCREATIONDATE: row.ZCREATIONDATE,
            ZSUBTITLE: row.ZSUBTITLE,
            ZTEXT: row.ZTEXT,
            ZTITLE: row.ZTITLE,
            ZUNIQUEIDENTIFIER: row.ZUNIQUEIDENTIFIER,
          });
        }
      },
      (error, count) => {
        if (error) reject(error);

        resolve(notes);
      }
    );
  });
}

export function getTags() {
  return new Promise((resolve, reject) => {
    const tags: string[] = [];

    db.each(
      "SELECT * FROM ZSFNOTETAG;",
      (error, row: Tag) => {
        if (!error) {
          tags.push(row.ZTITLE);
        }
      },
      (error, count) => {
        if (error) reject(error);

        resolve(tags);
      }
    );
  });
}
