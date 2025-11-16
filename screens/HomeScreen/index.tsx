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

  const handleEditExercise = (exercise: Exercise) => {
    navigation.navigate('EditPage', { exerciseId: exercise.id });
  };

  const handleEditTraining = (trainingId: number) => {
    navigation.navigate('AddExercises', { trainingId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>List of Exercises</Text>

      {trainings.length > 0 ? (
        <View style={styles.exercisesContainer}>
          {trainings.map((training) => (
            <View key={String(training.id)} style={styles.trainingGroup}>
              {/* Training header with edit button */}
              <View style={styles.trainingHeader}>
                <Text style={styles.trainingTitle}>
                  Training - {training.id}
                </Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditTraining(training.id as number)}
                >
                  <MaterialIcons name="edit" size={20} color="#6c757d" />
                </TouchableOpacity>
              </View>

              {/* Exercises for this training */}
              {training.exercises && training.exercises.length > 0 ? (
                training.exercises.map((exercise, index) => (
                  <TouchableOpacity 
                    key={String(exercise.id)} 
                    style={styles.exerciseRow}
                    onPress={() => handleEditExercise(exercise)}
                    activeOpacity={0.7}
                  >
                    {/* Number */}
                    <Text style={styles.exerciseNumber}>{index + 1}.</Text>

                    {/* Exercise details */}
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseWeight}>
                        {exercise.weight} kg × {exercise.repetitions}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noExercisesText}>No exercises yet</Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ marginBottom: 12 }}>No exercises registered yet.</Text>
      )}

      <View style={{ width: '100%', height: 1, backgroundColor: '#b63131ff', marginBottom: 12 }} />

      <View style={{ width: '100%' }}>
        <Button title="Add Training" onPress={() => navigation.navigate('AddExercises')} />
      </View>
    </ScrollView>
  );
}
