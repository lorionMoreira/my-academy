import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDatabase } from '../../context/DatabaseContext';
import { styles } from './styles';

export default function EditPageScreen({ route, navigation }: any) {
  const { exerciseId } = route.params || {};
  const { getExercisesByTraining } = useDatabase();
  
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');

  useEffect(() => {
    if (exerciseId) {
      // TODO: Fetch exercise by ID and populate the form
      console.log('Loading exercise:', exerciseId);
    }
  }, [exerciseId]);

  const handleSave = () => {
    if (!exerciseName.trim()) {
      Alert.alert('Validation', 'Enter exercise name');
      return;
    }
    
    // TODO: Implement save/update logic
    Alert.alert('Success', 'Exercise updated');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Exercise</Text>

      <TextInput 
        placeholder="Exercise Name" 
        value={exerciseName} 
        onChangeText={setExerciseName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Weight (kg)" 
        value={exerciseWeight} 
        onChangeText={setExerciseWeight} 
        style={styles.input} 
        keyboardType="numeric" 
      />
      <TextInput 
        placeholder="Repetitions" 
        value={exerciseReps} 
        onChangeText={setExerciseReps} 
        style={styles.input} 
        keyboardType="numeric" 
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Save Changes" onPress={handleSave} />
        <View style={{ height: 10 }} />
        <Button title="Cancel" onPress={() => navigation.goBack()} color="#6c757d" />
      </View>
    </View>
  );
}
