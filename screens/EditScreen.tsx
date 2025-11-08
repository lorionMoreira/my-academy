import React from 'react';
import { View, Text, Button } from 'react-native';

export default function EditScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Edit Screen</Text>
      <Text>Simple example: press to go to Add Home</Text>
      <Button title="Go to Add Home" onPress={() => navigation.navigate('Add' as any)} />
    </View>
  );
}
