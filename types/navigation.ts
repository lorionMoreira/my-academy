import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AddStackParamList = {
  Home: undefined;
  Details: undefined;
};

export type RootTabParamList = {
  Add: undefined;
  Edit: undefined;
  Show: undefined;
};

// Alias for older/alternate naming
export type RootStackParamList = AddStackParamList;

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
