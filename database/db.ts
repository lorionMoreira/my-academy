import type { SQLiteDatabase } from 'expo-sqlite';

export type Item = {
  id: number;
  title: string;
  created_at: string;
};

export const DB_NAME = 'my_academy.db';

export interface Exercise {
  id?: number;
  name: string;
  weight: number;
  repetitions: number;
  type_training_id: number;
}

export interface TypeTraining {
  id?: number;
  name: string;
  hardness: number;
}

export interface Training {
  id?: number;
  date_before: string;
  date_after: string;
  restlesness: number;
  type_training_id: number;
}

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

const addTypeTraining = async (name: string, hardness: number) => {
    await db.runAsync(
      `INSERT INTO type_training (name, hardness) VALUES (?, ?)`,
      [name, hardness]
    );
  };

  const getTypeTrainings = async (): Promise<TypeTraining[]> => {
    const result = await db.getAllAsync<TypeTraining>(`SELECT * FROM type_training`);
    return result;
  };

  const addExercise = async (exercise: Exercise) => {
    await db.runAsync(
      `INSERT INTO exercise (name, weight, repetitions, type_training_id)
       VALUES (?, ?, ?, ?)`,
      [exercise.name, exercise.weight, exercise.repetitions, exercise.type_training_id]
    );
  };

  const getExercisesByTypeTraining = async (typeTrainingId: number): Promise<Exercise[]> => {
    return await db.getAllAsync<Exercise>(
      `SELECT * FROM exercise WHERE type_training_id = ?`,
      [typeTrainingId]
    );
  };

  const addTraining = async (training: Training) => {
    await db.runAsync(
      `INSERT INTO training (date_before, date_after, restlesness, type_training_id)
       VALUES (?, ?, ?, ?)`,
      [training.date_before, training.date_after, training.restlesness, training.type_training_id]
    );
  };

  const getTrainings = async (): Promise<Training[]> => {
    return await db.getAllAsync<Training>(`
      SELECT training.*, type_training.name AS type_training_name
      FROM training
      JOIN type_training ON type_training.id = training.type_training_id
    `);
  };

  return {
    addTypeTraining,
    getTypeTrainings,
    addExercise,
    getExercisesByTypeTraining,
    addTraining,
    getTrainings,
  };

}


