import * as React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import Navigation from './navigation';
import { DB_NAME, migrateDbAsync } from './database/db';
import { DatabaseProvider } from './context/DatabaseContext';

export default function App() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDbAsync}>
      <DatabaseProvider>
        <Navigation />
      </DatabaseProvider>
    </SQLiteProvider>
  );
}
