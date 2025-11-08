import type { SQLiteDatabase } from 'expo-sqlite';
import type { Item, Exercise, TypeTraining, Training } from '../types/database';

export const DB_NAME = 'my_academy.db';

// Run on app start inside SQLiteProvider.onInit
export async function migrateDbAsync(db: SQLiteDatabase) {
  // Enable write-ahead logging for better concurrency and performance (optional)
  try {
    // Some platforms may not support WAL; ignore failure
    // @ts-ignore - execAsync exists in supported Expo SDKs
    await (db as any).execAsync?.('PRAGMA journal_mode = WAL;');
  } catch {}

 await db.execAsync(`
    CREATE TABLE IF NOT EXISTS type_training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      hardness INTEGER
    );

    CREATE TABLE IF NOT EXISTS training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_before TEXT,
      date_after TEXT,
      restlesness INTEGER,
      type_training_id INTEGER,
      FOREIGN KEY(type_training_id) REFERENCES type_training(id)
    );

    CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      weight REAL,
      repetitions INTEGER,
      type_training_id INTEGER,
      FOREIGN KEY(type_training_id) REFERENCES type_training(id)
    );
  `);

}

export async function addItemAsync(db: SQLiteDatabase, title: string) {
  await db.runAsync?.('INSERT INTO items (title) VALUES (?);', [title]);
}

export async function getItemsAsync(db: SQLiteDatabase): Promise<Item[]> {
  const rows = await db.getAllAsync?.<Item>(
    'SELECT id, title, created_at FROM items ORDER BY id DESC;'
  );
  return rows ?? [];
}

export async function updateItemAsync(db: SQLiteDatabase, id: number, title: string) {
  await db.runAsync?.('UPDATE items SET title = ? WHERE id = ?;', [title, id]);
}

export async function deleteItemAsync(db: SQLiteDatabase, id: number) {
  await db.runAsync?.('DELETE FROM items WHERE id = ?;', [id]);
}

export async function addTypeTraining(db: SQLiteDatabase,name: string, hardness: number) {
  await db.runAsync(
    `INSERT INTO type_training (name, hardness) VALUES (?, ?)`,
    [name, hardness]
  );
  // return inserted id
  const rows = await db.getAllAsync?.<{ id: number }>('SELECT last_insert_rowid() as id;');
  return rows && rows[0] ? rows[0].id : null;
};

export async function getTypeTrainings(db: SQLiteDatabase): Promise<TypeTraining[]> {
    const rows = await db.getAllAsync?.<TypeTraining>(
        'SELECT * FROM type_training'
    );
    return rows;
}

export async function addExercise(db: SQLiteDatabase, exercise: Exercise) {
  await db.runAsync?.(`INSERT INTO exercise (name, weight, repetitions, type_training_id)
       VALUES (?, ?, ?, ?)`, 
       [exercise.name, exercise.weight, exercise.repetitions, exercise.type_training_id]);
}


export async function getExercisesByTypeTraining(db: SQLiteDatabase,typeTrainingId: number): Promise<Exercise[]> {
    return await db.getAllAsync<Exercise>(
        `SELECT * FROM exercise WHERE type_training_id = ?`,
        [typeTrainingId]
    );
};

export async function addTraining(db: SQLiteDatabase, training: Training) {
    await db.runAsync(
        `INSERT INTO training (date_before, date_after, restlesness, type_training_id)
        VALUES (?, ?, ?, ?)`,
        [training.date_before, training.date_after, training.restlesness, training.type_training_id]
    );
};

export async function getTrainings (db: SQLiteDatabase): Promise<Training[]> {
    return await db.getAllAsync<Training>(`
        SELECT training.*, type_training.name AS type_training_name
        FROM training
        JOIN type_training ON type_training.id = training.type_training_id
    `);
};