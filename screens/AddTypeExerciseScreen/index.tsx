import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDatabase } from '../../context/DatabaseContext';
import { styles } from './styles';

export default function AddTypeExerciseScreen({ navigation }: any) {
  const { addTypeExercise } = useDatabase();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Validation', 'Enter a name');
      return;
    }
    if (!slug.trim()) {
      Alert.alert('Validation', 'Enter a slug');
      return;
    }
    const id = await addTypeExercise(name.trim(), slug.trim());
    if (id) {
      Alert.alert('Saved', 'TypeExercise created');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to create');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Type Exercise</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Slug" value={slug} onChangeText={setSlug} style={styles.input} />
      <Button title="Save" onPress={handleSave} />
      <View style={{ height: 8 }} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
