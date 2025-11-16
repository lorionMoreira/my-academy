import React, { createContext, useContext, ReactNode } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { addItemAsync, getItemsAsync, updateItemAsync, deleteItemAsync, addTypeExercise, getTypeExercises, addExercise, updateExercise, deleteExercise, getExercisesByTraining, addTraining, getTrainings, getTrainingById, addTrainingHistory, clearAll } from '../database/db';
import type { Item, TypeExercise, Exercise, Training } from '../types/database';

interface DatabaseContextType {
  addItem: (title: string) => Promise<void>;
  getItems: () => Promise<Item[]>;
  updateItem: (id: number, title: string) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;

  // Training-related
  addTypeExercise: (name: string, slug: string) => Promise<number | null>;
  getTypeExercises: () => Promise<TypeExercise[]>;
  addExercise: (exercise: Exercise) => Promise<void>;
  updateExercise: (id: number, exercise: Partial<Exercise>) => Promise<void>;
  deleteExercise: (id: number) => Promise<void>;
  getExercisesByTraining: (trainingId: number) => Promise<Exercise[]>;
  addTraining: (training: Training) => Promise<number | null>;
  getTrainings: () => Promise<Training[]>;
  getTrainingById: (id: number) => Promise<Training | null>;
  addTrainingHistory: (trainingId: number, date: string) => Promise<number | null>;
  
  // Dev utilities
  clearAll: () => Promise<void>;
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
    addTypeExercise: async (name: string, slug: string) => {
      return await addTypeExercise(db, name, slug);
    },
    getTypeExercises: async () => {
      return await getTypeExercises(db) ?? [];
    },
    addExercise: async (exercise: Exercise) => {
      await addExercise(db, exercise);
    },
    updateExercise: async (id: number, exercise: Partial<Exercise>) => {
      await updateExercise(db, id, exercise);
    },
    deleteExercise: async (id: number) => {
      await deleteExercise(db, id);
    },
    getExercisesByTraining: async (trainingId: number) => {
      return await getExercisesByTraining(db, trainingId) ?? [];
    },
    addTraining: async (training: Training) => {
      return await addTraining(db, training);
    },
    getTrainings: async () => {
      return await getTrainings(db) ?? [];
    },
    getTrainingById: async (id: number) => {
      return await getTrainingById(db, id);
    },
    addTrainingHistory: async (trainingId: number, date: string) => {
      return await addTrainingHistory(db, trainingId, date);
    },
    clearAll: async () => {
      await clearAll(db);
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