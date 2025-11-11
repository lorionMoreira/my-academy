import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AddStackParamList = {
  Home: undefined;
  Details: undefined;
  AddExercises: undefined;
  AddTypeExercise: undefined;
  EditPage: { exerciseId: number };
};

export type RootTabParamList = {
  Add: undefined;
  Treino: undefined;
  Lista: undefined;
  Dev: undefined;
};

// Alias for older/alternate naming
export type RootStackParamList = AddStackParamList;

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
