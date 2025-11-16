import React, { useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '../../context/DatabaseContext';
import type { Training } from '../../types/database';
import { styles } from './styles';

export default function TreinoScreen({ navigation }: any) {
  const { getTrainings, addTrainingHistory } = useDatabase();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        try {
          const t = await getTrainings();
          if (isActive) {
            setTrainings(t ?? []);
          }
        } catch (err) {
          console.error('Error loading trainings', err);
        }
      })();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleSelectTraining = (trainingId: number) => {
    setSelectedTrainingId(trainingId);
  };

  const handleStart = async () => {
    if (!selectedTrainingId) {
      Alert.alert('Selection Required', 'Please select a training first');
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      const historyId = await addTrainingHistory(selectedTrainingId, currentDate);
      
      if (historyId) {
        navigation.navigate('MyTraining', { 
          trainingId: selectedTrainingId, 
          historyId 
        });
      } else {
        Alert.alert('Error', 'Failed to create training history');
      }
    } catch (err) {
      console.error('Error starting training', err);
      Alert.alert('Error', 'Failed to start training');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Select the Training</Text>

      {trainings.length > 0 ? (
        <View style={styles.trainingsContainer}>
          {trainings.map((training) => (
            <TouchableOpacity
              key={String(training.id)}
              style={[
                styles.trainingCard,
                selectedTrainingId === training.id && styles.trainingCardSelected
              ]}
              onPress={() => handleSelectTraining(training.id as number)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.trainingTitle,
                selectedTrainingId === training.id && styles.trainingTitleSelected
              ]}>
                Training #{training.id}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>No trainings available. Create one first.</Text>
      )}

      <View style={styles.footer}>
        <View style={{ width: '100%' }}>
          <Button 
            title="Start" 
            onPress={handleStart}
            disabled={!selectedTrainingId}
          />
        </View>
      </View>
    </ScrollView>
  );
}
