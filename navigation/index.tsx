import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, PALETTE, TABLE_COLORS, TABLE_PALETTE } from '../constants/colors';  
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddExercisesScreen from '../screens/AddExercisesScreen';
import AddTypeExerciseScreen from '../screens/AddTypeExerciseScreen';
import EditPageScreen from '../screens/EditPageScreen';
import TreinoScreen from '../screens/TreinoScreen';
import MyTrainingScreen from '../screens/MyTrainingScreen';
import ListaScreen from '../screens/ListaScreen';
import DevScreen from '../screens/DevScreen';
import type { RootTabParamList, AddStackParamList, TreinoStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();
const AddStack = createNativeStackNavigator<AddStackParamList>();
const TreinoStack = createNativeStackNavigator<TreinoStackParamList>();

function AddStackScreen() {
  return (
    <AddStack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <AddStack.Screen name="Home" component={HomeScreen} />
      <AddStack.Screen name="AddExercises" component={AddExercisesScreen} />
      <AddStack.Screen name="AddTypeExercise" component={AddTypeExerciseScreen} />
      <AddStack.Screen name="EditPage" component={EditPageScreen} />
      <AddStack.Screen name="Details" component={DetailsScreen} />
    </AddStack.Navigator>
  );
}

function TreinoStackScreen() {
  return (
    <TreinoStack.Navigator
      initialRouteName="TreinoHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <TreinoStack.Screen name="TreinoHome" component={TreinoScreen} />
      <TreinoStack.Screen name="MyTraining" component={MyTrainingScreen} />
    </TreinoStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof MaterialIcons.glyphMap = 'add-circle';
            
            if (route.name === 'Add') {
              iconName = 'add-circle';
            } else if (route.name === 'Treino') { // treino - clicar para desparar o relogio e falar que foi
              iconName = 'edit';
            } else if (route.name === 'Lista') { // Lista - mostrar a lista 
              iconName = 'visibility';
            } else if (route.name === 'Dev') {
              iconName = 'build';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.redMedium,
          tabBarInactiveTintColor: TABLE_COLORS.grayDark,
        })}
        initialRouteName="Add"
      >
        <Tab.Screen name="Add" component={AddStackScreen} />
        <Tab.Screen name="Treino" component={TreinoStackScreen} />
        <Tab.Screen name="Lista" component={ListaScreen} />
        <Tab.Screen name="Dev" component={DevScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

