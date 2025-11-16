import type { SQLiteDatabase } from 'expo-sqlite';
import type { Item, Exercise, TypeExercise, Training } from '../types/database';

export const DB_NAME = 'my_academy.db';

// Run on app start inside SQLiteProvider.onInit
export async function migrateDbAsync(db: SQLiteDatabase) {
  // Enable write-ahead logging for better concurrency and performance (optional)
  try {
    // Some platforms may not support WAL; ignore failure
    // @ts-ignore - execAsync exists in supported Expo SDKs
    await (db as any).execAsync?.('PRAGMA journal_mode = WAL;');
  } catch {}

  // Drop old tables and recreate with new schema
  await db.execAsync(`
    DROP TABLE IF EXISTS exercise;
    DROP TABLE IF EXISTS training;
    DROP TABLE IF EXISTS type_exercise;
    DROP TABLE IF EXISTS training_history;
    
    CREATE TABLE type_exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL
    );

    CREATE TABLE training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_before TEXT,
      date_after TEXT,
      restlesness INTEGER,
      toughness INTEGER
    );

    CREATE TABLE exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      weight REAL,
      repetitions INTEGER,
      training_id INTEGER,
      type_exercise_id INTEGER,
      FOREIGN KEY(training_id) REFERENCES training(id),
      FOREIGN KEY(type_exercise_id) REFERENCES type_exercise(id)
    );

    CREATE TABLE training_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      training_id INTEGER,
      date TEXT NOT NULL,
      FOREIGN KEY(training_id) REFERENCES training(id)
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

export async function addTypeExercise(db: SQLiteDatabase, name: string, slug: string) {
  await db.runAsync(
    `INSERT INTO type_exercise (name, slug) VALUES (?, ?)`,
    [name, slug]
  );
  // return inserted id
  const rows = await db.getAllAsync?.<{ id: number }>('SELECT last_insert_rowid() as id;');
  return rows && rows[0] ? rows[0].id : null;
};

export async function getTypeExercises(db: SQLiteDatabase): Promise<TypeExercise[]> {
    const rows = await db.getAllAsync?.<TypeExercise>(
        'SELECT * FROM type_exercise'
    );
    return rows;
}

export async function addExercise(db: SQLiteDatabase, exercise: Exercise) {
  await db.runAsync?.(`INSERT INTO exercise (name, weight, repetitions, training_id, type_exercise_id)
       VALUES (?, ?, ?, ?, ?)`, 
       [exercise.name, exercise.weight, exercise.repetitions, exercise.training_id, exercise.type_exercise_id]);
}


export async function getExercisesByTraining(db: SQLiteDatabase, trainingId: number): Promise<Exercise[]> {
    const result = await db.getAllAsync<Exercise>(
        `SELECT * FROM exercise WHERE training_id = ?`,
        [trainingId]
    );
    return result ?? [];
};

export async function updateExercise(db: SQLiteDatabase, id: number, exercise: Partial<Exercise>) {
  const { name, weight, repetitions, type_exercise_id } = exercise;
  await db.runAsync?.(
    `UPDATE exercise SET name = ?, weight = ?, repetitions = ?, type_exercise_id = ? WHERE id = ?`,
    [name ?? '', weight ?? 0, repetitions ?? 0, type_exercise_id ?? 0, id]
  );
}

export async function deleteExercise(db: SQLiteDatabase, id: number) {
  await db.runAsync?.('DELETE FROM exercise WHERE id = ?;', [id]);
}

export async function addTraining(db: SQLiteDatabase, training: Training) {
    await db.runAsync(
        `INSERT INTO training (date_before, date_after, restlesness)
        VALUES (?, ?, ?)`,
        [training.date_before, training.date_after, training.restlesness]
    );
    // return inserted id
    const rows = await db.getAllAsync?.<{ id: number }>('SELECT last_insert_rowid() as id;');
    return rows && rows[0] ? rows[0].id : null;
};

export async function getTrainings (db: SQLiteDatabase): Promise<Training[]> {
    return await db.getAllAsync<Training>(`
        SELECT * FROM training
    `);
};

export async function getTrainingById(db: SQLiteDatabase, id: number): Promise<Training | null> {
    const result = await db.getAllAsync<Training>(
        'SELECT * FROM training WHERE id = ?',
        [id]
    );
    return result && result.length > 0 ? result[0] : null;
}

export async function addTrainingHistory(db: SQLiteDatabase, trainingId: number, date: string) {
    await db.runAsync(
        'INSERT INTO training_history (training_id, date) VALUES (?, ?)',
        [trainingId, date]
    );
    const rows = await db.getAllAsync?.<{ id: number }>('SELECT last_insert_rowid() as id;');
    return rows && rows[0] ? rows[0].id : null;
}

export async function clearAll(db: SQLiteDatabase) {
  // Delete all rows from the tables
  await db.runAsync('DELETE FROM exercise;');
  await db.runAsync('DELETE FROM training;');
  await db.runAsync('DELETE FROM type_exercise;');
  // If items table exists, clear it too (legacy)
  try {
    await db.runAsync('DELETE FROM items;');
  } catch {}
}

export async function clearAllData(db: SQLiteDatabase) {
  await db.execAsync(`
    DELETE FROM training;
    DELETE FROM exercise;
    DELETE FROM type_exercise;
    DELETE FROM items;
  `);
};