import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDatabase } from '../context/DatabaseContext';
import type { TypeTraining, Exercise, Training } from '../types/database';

type ExerciseFormRow = { name: string; weight: string; repetitions: string };

export default function HomeScreen({ navigation }: any) {
  const {
    addTypeTraining,
    getTypeTrainings,
    addExercise,
    addTraining,
  } = useDatabase();

  const [step, setStep] = useState<number>(1);

  // Step 1 - TypeTraining
  const [types, setTypes] = useState<TypeTraining[]>([]);
  const [selectedType, setSelectedType] = useState<TypeTraining | null>(null);
  const [typeName, setTypeName] = useState('');
  const [typeHardness, setTypeHardness] = useState('1');

  // Step 2 - Exercises
  const [exercises, setExercises] = useState<ExerciseFormRow[]>([]);

  // Step 3 - Training
  const [dateBefore, setDateBefore] = useState('');
  const [dateAfter, setDateAfter] = useState('');
  const [restlesness, setRestlesness] = useState('0');

  useEffect(() => {
    (async () => {
      const existing = await getTypeTrainings();
      setTypes(existing ?? []);
    })();
  }, [getTypeTrainings]);

  async function handleCreateTypeAndNext() {
    if (!typeName.trim()) {
      Alert.alert('Validation', 'Enter a type name');
      return;
    }
    const id = await addTypeTraining(typeName.trim(), Number(typeHardness) || 1);
    if (id) {
      const newType: TypeTraining = { id, name: typeName.trim(), hardness: Number(typeHardness) || 1 };
      setTypes((t) => [newType, ...t]);
      setSelectedType(newType);
      setStep(2);
    } else {
      Alert.alert('Error', 'Failed to create type training');
    }
  }

  function selectExistingType(t: TypeTraining) {
    setSelectedType(t);
    setStep(2);
  }

  function addExerciseRow() {
    setExercises((e) => [...e, { name: '', weight: '', repetitions: '' }]);
  }

  function updateExerciseRow(index: number, field: keyof ExerciseFormRow, value: string) {
    setExercises((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function removeExerciseRow(index: number) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSaveExercisesAndNext() {
    if (!selectedType) {
      Alert.alert('Validation', 'Select or create a Type Training first');
      return;
    }
    // basic validation
    for (const ex of exercises) {
      if (!ex.name.trim()) {
        Alert.alert('Validation', 'Please fill all exercise names');
        return;
      }
    }

    // persist exercises
    for (const ex of exercises) {
      const exercise: Exercise = {
        name: ex.name.trim(),
        weight: parseFloat(ex.weight) || 0,
        repetitions: parseInt(ex.repetitions, 10) || 0,
        type_training_id: selectedType.id as number,
      };
      await addExercise(exercise);
    }

    setStep(3);
  }

  async function handleSaveTraining() {
    if (!selectedType) {
      Alert.alert('Validation', 'Select or create a Type Training first');
      return;
    }
    const training: Training = {
      date_before: dateBefore,
      date_after: dateAfter,
      restlesness: Number(restlesness) || 0,
      type_training_id: selectedType.id as number,
    };
    await addTraining(training);
    Alert.alert('Saved', 'Training registered successfully');
    // reset form
    setStep(1);
    setTypeName('');
    setTypeHardness('1');
    setSelectedType(null);
    setExercises([]);
    setDateBefore('');
    setDateAfter('');
    setRestlesness('0');
    // refresh types
    const existing = await getTypeTrainings();
    setTypes(existing ?? []);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Register Training</Text>

      {step === 1 && (
        <View style={{ width: '100%' }}>
          <Text style={styles.sub}>Choose existing Type Training</Text>
          {types.map((t) => (
            <TouchableOpacity key={String(t.id)} style={styles.typeRow} onPress={() => selectExistingType(t)}>
              <Text style={{ fontWeight: '600' }}>{t.name}</Text>
              <Text style={{ color: '#666' }}>Hardness: {t.hardness}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sub}>Or create a new Type Training</Text>
          <TextInput placeholder="Type name" style={styles.input} value={typeName} onChangeText={setTypeName} />
          <TextInput placeholder="Hardness (number)" style={styles.input} value={typeHardness} onChangeText={setTypeHardness} keyboardType="numeric" />
          <Button title="Create and Next" onPress={handleCreateTypeAndNext} />
        </View>
      )}

      {step === 2 && (
        <View style={{ width: '100%' }}>
          <Text style={styles.sub}>Add Exercises for type: {selectedType?.name}</Text>
          {exercises.map((row, idx) => (
            <View key={idx} style={styles.exerciseRow}>
              <TextInput placeholder="Name" style={styles.smallInput} value={row.name} onChangeText={(v) => updateExerciseRow(idx, 'name', v)} />
              <TextInput placeholder="Weight" style={styles.smallInput} value={row.weight} onChangeText={(v) => updateExerciseRow(idx, 'weight', v)} keyboardType="numeric" />
              <TextInput placeholder="Reps" style={styles.smallInput} value={row.repetitions} onChangeText={(v) => updateExerciseRow(idx, 'repetitions', v)} keyboardType="numeric" />
              <Button title="Remove" onPress={() => removeExerciseRow(idx)} />
            </View>
          ))}
          <Button title="Add Exercise" onPress={addExerciseRow} />
          <View style={{ height: 8 }} />
          <Button title="Next" onPress={handleSaveExercisesAndNext} />
          <View style={{ height: 8 }} />
          <Button title="Back" onPress={() => setStep(1)} />
        </View>
      )}

      {step === 3 && (
        <View style={{ width: '100%' }}>
          <Text style={styles.sub}>Training Details</Text>
          <TextInput placeholder="Date before" style={styles.input} value={dateBefore} onChangeText={setDateBefore} />
          <TextInput placeholder="Date after" style={styles.input} value={dateAfter} onChangeText={setDateAfter} />
          <TextInput placeholder="Restlesness (number)" style={styles.input} value={restlesness} onChangeText={setRestlesness} keyboardType="numeric" />
          <Button title="Save Training" onPress={handleSaveTraining} />
          <View style={{ height: 8 }} />
          <Button title="Back" onPress={() => setStep(2)} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 16 },
  heading: { fontSize: 20, marginBottom: 12, fontWeight: '600' },
  sub: { fontSize: 16, marginBottom: 8 },
  input: { width: '100%', borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
  smallInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 8, marginRight: 8 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typeRow: { padding: 10, backgroundColor: '#fafafa', borderRadius: 6, marginBottom: 8 },
});
