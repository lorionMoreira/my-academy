import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDatabase } from '../context/DatabaseContext';

export default function EditScreen({ navigation }: any) {
  const { getItems, updateItem } = useDatabase();

  async function handleUpdateLatest() {
    const items = await getItems();
    if (!items.length) {
      Alert.alert('Nothing to edit', 'Add an item first in the Add tab.');
      return;
    }
    const latest = items[0];
    const newTitle = `Updated at ${new Date().toLocaleTimeString()}`;
    await updateItem(latest.id, newTitle);
    Alert.alert('Updated', `Item #${latest.id} updated.`);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Edit Screen</Text>
      <Text>Tap the button to update the most recent item.</Text>
      <Button title="Update latest item" onPress={handleUpdateLatest} />
      <Button title="Go to Add Home" onPress={() => navigation.navigate('Add' as any)} />
    </View>
  );
}
