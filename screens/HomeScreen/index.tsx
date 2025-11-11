import React, { useEffect, useState , useCallback} from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDatabase } from '../../context/DatabaseContext';
import type { Training, Exercise } from '../../types/database';
import { styles } from './styles';

type TrainingWithExercises = Training & { exercises: Exercise[] };

export default function HomeScreen({ navigation }: any) {
  const { getTrainings, getExercisesByTraining } = useDatabase();
  const [trainings, setTrainings] = useState<TrainingWithExercises[]>([]);
    /*
  useEffect(() => {
    (async () => {
      const t = await getTrainings();
      setTrainings(t ?? []);
    })();
  }, [getTrainings]);
    */
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        try {
          const t = await getTrainings();
          if (!t || !Array.isArray(t) || t.length === 0) {
            if (isActive) setTrainings([]);
            return;
          }

          const trainingsWithExercises = await Promise.all(
            t.map(async (training) => {
              try {
                const exercises = await getExercisesByTraining(training.id as number);
                return { ...training, exercises: exercises || [] };
              } catch (err) {
                console.error('Error loading exercises for id:', training.id, err);
                return { ...training, exercises: [] };
              }
            })
          );

          if (isActive) {
            setTrainings(trainingsWithExercises);
          }
        } catch (err) {
          console.error('Error in focus effect', err);
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>List of Exercises</Text>

      {trainings.length > 0 ? (
        <View style={{ width: '100%', marginBottom: 12 }}>
          {trainings.map((tr) => (
            <View key={String(tr.id)}>
              {tr.exercises && tr.exercises.length > 0 ? (
                tr.exercises.map((exercise) => (
                  <View key={String(exercise.id)} style={styles.exerciseCard}>
                    {/* Left side - Edit and Delete icons */}
                    <View style={styles.iconsContainer}>
                      <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="edit" size={20} color="#007AFF" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="close" size={20} color="#dc3545" />
                      </TouchableOpacity>
                    </View>

                    {/* Center - Exercise details */}
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseWeight}>{exercise.weight} kg</Text>
                    </View>

                    {/* Right side - Repetitions */}
                    <View style={styles.repsContainer}>
                      <Text style={styles.repsText}>{exercise.repetitions}</Text>
                      <Text style={styles.repsLabel}>reps</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ marginBottom: 8, color: '#999' }}>
                  Training #{tr.id} has no exercises
                </Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginBottom: 12 }}>No exercises registered yet.</Text>
      )}

      <View style={{ width: '100%', height: 1, backgroundColor: '#b63131ff', marginBottom: 12 }} />

      <Button title="Add Training" onPress={() => navigation.navigate('AddExercises')} />
    </ScrollView>
  );
}
