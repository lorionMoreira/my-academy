import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useDatabase } from '../context/DatabaseContext';

export default function HomeScreen({ navigation }: any) {
  const { addItem } = useDatabase();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }
    try {
      setLoading(true);
      await addItem(title.trim());
      setTitle('');
      // Navigate to Show tab to view the new item
      navigation.navigate('Show');
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Failed to insert item');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a title..."
        value={title}
        onChangeText={setTitle}
      />
      <Button title={loading ? 'Saving...' : 'Save'} onPress={handleAdd} disabled={loading} />
      <View style={{ height: 16 }} />
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  heading: { fontSize: 20, marginBottom: 12, fontWeight: '600' },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
});
