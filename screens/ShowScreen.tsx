import React from 'react';
import { View, Text } from 'react-native';

export default function ShowScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Show Screen</Text>
      <Text>Simple example: display static content here.</Text>
    </View>
  );
}
