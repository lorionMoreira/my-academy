import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDatabase } from '../../context/DatabaseContext';
import { COLORS, PALETTE, TABLE_COLORS, TABLE_PALETTE } from '../../constants/colors';  
import type { TypeExercise } from '../../types/database';
import { styles } from './styles';

type ExerciseRow = { name: string; weight: string; repetitions: string; type_exercise_id: number };

export default function AddExercisesScreen({ navigation }: any) {
  const { getTypeExercises, addExercise, addTraining } = useDatabase();
  const [types, setTypes] = useState<TypeExercise[]>([]);
  const [savedExercises, setSavedExercises] = useState<ExerciseRow[]>([]);
  
  // Dropdown state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  
  // Current form state
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  
  // Edit mode
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  


  useFocusEffect(
    useCallback(() => {
      (async () => {
        const t = await getTypeExercises();
        setTypes(t ?? []);
        if (t && t.length > 0 && !selectedTypeId) {
          setSelectedTypeId(t[0].id as number);
        }
      })();
    }, [getTypeExercises])
  );

  // Handle exercise selection from dropdown
  const handleExerciseSelect = (selectedValue: string | null) => {
    if (selectedValue === null) return;
    
    const idx = parseInt(selectedValue, 10);
    const exercise = savedExercises[idx];
    
    if (exercise) {
      setExerciseName(exercise.name);
      setExerciseWeight(exercise.weight);
      setExerciseReps(exercise.repetitions);
      setSelectedTypeId(exercise.type_exercise_id);
      setEditingIndex(idx);
    }
  };

  const cancelEdit = () => {
    setExerciseName('');
    setExerciseWeight('');
    setExerciseReps('');
    setEditingIndex(null);
    setValue(null);
    if (types.length > 0) {
      setSelectedTypeId(types[0].id as number);
    }
  };

  const handleEdit = () => {
    if (editingIndex === null) return;
    
    if (!exerciseName.trim()) {
      Alert.alert('Validation', 'Enter exercise name');
      return;
    }
    if (!selectedTypeId) {
      Alert.alert('Validation', 'Select an exercise type');
      return;
    }

    const updatedExercise: ExerciseRow = {
      name: exerciseName.trim(),
      weight: exerciseWeight,
      repetitions: exerciseReps,
      type_exercise_id: selectedTypeId,
    };

    setSavedExercises((prev) => prev.map((ex, idx) => idx === editingIndex ? updatedExercise : ex));
    
    Alert.alert('Success', 'Exercise updated');
    cancelEdit();
  };

  const handleDelete = () => {
    if (editingIndex === null) return;
    
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSavedExercises((prev) => prev.filter((_, idx) => idx !== editingIndex));
            cancelEdit();
          },
        },
      ]
    );
  };

  function addExerciseToList() {
    if (types.length === 0) {
      Alert.alert('No Type Exercises', 'Create a TypeExercise first');
      return;
    }
    if (!exerciseName.trim()) {
      Alert.alert('Validation', 'Enter exercise name');
      return;
    }
    if (!selectedTypeId) {
      Alert.alert('Validation', 'Select an exercise type');
      return;
    }

    const newExercise: ExerciseRow = {
      name: exerciseName.trim(),
      weight: exerciseWeight,
      repetitions: exerciseReps,
      type_exercise_id: selectedTypeId,
    };

    setSavedExercises((prev) => [...prev, newExercise]);
    
    // Clear form
    setExerciseName('');
    setExerciseWeight('');
    setExerciseReps('');
    // Keep the selected type for convenience
  }

  async function handleSaveAll() {
    if (!savedExercises.length) {
      Alert.alert('Validation', 'Add at least one exercise');
      return;
    }

    // First create training record and get its ID
    const trainingId = await addTraining({
      date_before: '0',
      date_after: '0',
      restlesness:  0,
    });

    if (!trainingId) {
      Alert.alert('Error', 'Failed to create training');
      return;
    }

    // Then persist exercises with training_id
    for (const ex of savedExercises) {
      await addExercise({
        name: ex.name,
        weight: parseFloat(ex.weight) || 0,
        repetitions: parseInt(ex.repetitions || '0', 10) || 0,
        training_id: trainingId,
        type_exercise_id: ex.type_exercise_id,
      });
    }

    Alert.alert('Saved', 'Exercises and training saved');
    setSavedExercises([]);
    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>

      {types.length === 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text>No TypeExercise found.</Text>
          <Button title="Create TypeExercise" onPress={() => navigation.navigate('AddTypeExercise')} />
        </View>
      )}

      {types.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Button title="Create New TypeExercise" onPress={() => navigation.navigate('AddTypeExercise')} />
        </View>
      )}

      <View style={{ marginBottom: 12, zIndex: 1000 }}>
        <Text style={styles.sub}>Exercises Added ({savedExercises.length}):</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={savedExercises.map((ex, idx) => ({
            label: `${ex.name} - ${ex.weight}kg × ${ex.repetitions} reps`,
            value: idx.toString(),
          }))}
          setOpen={setOpen}
          setValue={setValue}
          onSelectItem={(item) => handleExerciseSelect(item.value as string)}
          placeholder="Exercises List"
          style={{ borderColor: '#ccc' }}
          dropDownContainerStyle={{ borderColor: '#ccc' }}
          listMode="SCROLLVIEW"
        />
      </View>

      <Text style={styles.sub}>{editingIndex !== null ? 'Edit Exercise' : 'Add Exercise'}</Text>
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
      
      <Text style={{ fontSize: 12, marginTop: 4, marginBottom: 4 }}>Exercise Type:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
        {types.map((t) => (
          <TouchableOpacity
            key={String(t.id)}
            style={[
              { padding: 6, margin: 4, borderWidth: 1, borderRadius: 4 },
              selectedTypeId === t.id ? { backgroundColor: '#dc3545', borderColor: '#dc3545' } : { borderColor: '#ccc' }
            ]}
            onPress={() => setSelectedTypeId(t.id as number)}
          >
            <Text style={selectedTypeId === t.id ? { color: '#fff' } : { color: '#000' }}>{t.slug}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {editingIndex === null ? (
        <Button title="Add Exercise" onPress={addExerciseToList} />
      ) : (
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Button title="Update" onPress={handleEdit} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Delete" onPress={handleDelete} color="#dc3545" />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" onPress={cancelEdit} color="#6c757d" />
          </View>
        </View>
      )}

      </View>

      {/* Footer with action buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAll}>
          <Text style={styles.saveButtonText}>Save All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
