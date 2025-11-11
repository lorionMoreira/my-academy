import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDatabase } from '../../context/DatabaseContext';
import { styles } from './styles';

export default function DevScreen() {
  const { clearAll } = useDatabase();
  const [clearing, setClearing] = useState(false);

  async function handleClearAll() {
    Alert.alert(
      'Confirm Clear',
      'This will delete ALL data from the database. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              setClearing(true);
              await clearAll();
              Alert.alert('Success', 'All data cleared');
            } catch (e) {
              console.warn(e);
              Alert.alert('Error', 'Failed to clear data');
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Development Tools</Text>
      <Text style={styles.warning}>⚠️ Danger Zone</Text>
      <Button
        title={clearing ? 'Clearing...' : 'Clear All Database Data'}
        onPress={handleClearAll}
        disabled={clearing}
        color="red"
      />
    </View>
  );
}
