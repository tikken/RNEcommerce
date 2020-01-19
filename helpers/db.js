import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, adress TEXT NOT NULL, lat REAL, lng);",
        [],
        () => {
          res();
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, adress, lat, lng) => {
  const promise = new Promise((res, rej) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, adress, lat, lng) VALUES (?, ?, ?, ?, ?);`,
        [title, imageUri, adress, lat, lng],
        (_, result) => {
          console.log("insert results", result);
          res(result);
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });
};
