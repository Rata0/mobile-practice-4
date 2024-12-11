import * as SQLite from "expo-sqlite";

const databaseName = "products123";

const initializeDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS goods (id INTEGER, title TEXT, image TEXT, price INTEGER, description TEXT);
      `);
  } catch (e) {
    console.log("error ", e);
  }
};

const addNewProduct = async (id, title, image, price, description) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    await db.runAsync(
      `INSERT INTO goods (id, title, image, price, description) VALUES (?, ?, ?, ?, ?)`,
      id,
      title,
      image,
      price,
      description
    );
  } catch (e) {
    console.log("error ", e);
  }
};

const getItemsCount = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const allRows = await db.getAllAsync("SELECT * FROM goods");

    const result = {};

    for (let row of allRows) {
      if (!Object.hasOwn(result, row.id)) {
        result[row.id] = { ...row, quantity: 1 };
      } else {
        result[row.id].quantity += 1;
      }
    }

    return Object.values(result);
  } catch (e) {
    console.log(e);
  }
};

export { initializeDatabase, addNewProduct, getItemsCount };
