import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function MyTrainingScreen({ route, navigation }: any) {
  const { trainingId, historyId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Training Session</Text>
      <Text>Training ID: {trainingId}</Text>
      <Text>History ID: {historyId}</Text>
      <Text style={{ marginTop: 20, color: '#666' }}>
        This screen will show the active training session
      </Text>
    </View>
  );
}
