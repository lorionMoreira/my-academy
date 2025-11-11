import React, { useEffect, useState , useCallback} from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '../../context/DatabaseContext';
import type { Training } from '../../types/database';
import { styles } from './styles';

export default function HomeScreen({ navigation }: any) {
  const { getTrainings } = useDatabase();
  const [trainings, setTrainings] = useState<Training[]>([]);
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
      (async () => {
        const t = await getTrainings();
        setTrainings(t ?? []);
      })();
    }, [getTrainings])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>List of Trainings</Text>

      {trainings.length > 0 ? (
        <View style={{ width: '100%', marginBottom: 12 }}>
          {trainings.map((tr) => (
            <Text key={String(tr.id)} style={{ marginBottom: 6 }}>{`${tr.id} — ${tr.date_before || 'No date'} — Restlesness: ${tr.restlesness}`}</Text>
          ))}
        </View>
      ) : (
        <Text style={{ marginBottom: 12 }}>No trainings registered yet.</Text>
      )}

      <View style={{ width: '100%', height: 1, backgroundColor: '#b63131ff', marginBottom: 12 }} />

      <Button title="Add Training" onPress={() => navigation.navigate('AddExercises')} />
    </ScrollView>
  );
}
