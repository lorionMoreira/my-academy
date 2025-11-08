import React, { createContext, useContext, ReactNode } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { addItemAsync, getItemsAsync, updateItemAsync, deleteItemAsync, addTypeTraining, getTypeTrainings, addExercise, getExercisesByTypeTraining, addTraining, getTrainings } from '../database/db';
import type { Item, TypeTraining, Exercise, Training } from '../types/database';

interface DatabaseContextType {
  addItem: (title: string) => Promise<void>;
  getItems: () => Promise<Item[]>;
  updateItem: (id: number, title: string) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;

  // Training-related
  addTypeTraining: (name: string, hardness: number) => Promise<number | null>;
  getTypeTrainings: () => Promise<TypeTraining[]>;
  addExercise: (exercise: Exercise) => Promise<void>;
  getExercisesByTypeTraining: (typeTrainingId: number) => Promise<Exercise[]>;
  addTraining: (training: Training) => Promise<void>;
  getTrainings: () => Promise<Training[]>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();

  const contextValue: DatabaseContextType = {
    addItem: async (title: string) => {
      await addItemAsync(db, title);
    },
    getItems: async () => {
      return await getItemsAsync(db);
    },
    updateItem: async (id: number, title: string) => {
      await updateItemAsync(db, id, title);
    },
    deleteItem: async (id: number) => {
      await deleteItemAsync(db, id);
    },
    addTypeTraining: async (name: string, hardness: number) => {
      return await addTypeTraining(db, name, hardness);
    },
    getTypeTrainings: async () => {
      return await getTypeTrainings(db) ?? [];
    },
    addExercise: async (exercise: Exercise) => {
      await addExercise(db, exercise);
    },
    getExercisesByTypeTraining: async (typeTrainingId: number) => {
      return await getExercisesByTypeTraining(db, typeTrainingId) ?? [];
    },
    addTraining: async (training: Training) => {
      await addTraining(db, training);
    },
    getTrainings: async () => {
      return await getTrainings(db) ?? [];
    },
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
