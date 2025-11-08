import React, { createContext, useContext, ReactNode } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { addItemAsync, getItemsAsync, updateItemAsync, deleteItemAsync, type Item } from '../database/db';

interface DatabaseContextType {
  addItem: (title: string) => Promise<void>;
  getItems: () => Promise<Item[]>;
  updateItem: (id: number, title: string) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
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
