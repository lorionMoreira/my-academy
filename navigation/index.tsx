import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, PALETTE, TABLE_COLORS, TABLE_PALETTE } from '../constants/colors';  
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditScreen from '../screens/EditScreen';
import ShowScreen from '../screens/ShowScreen';
import type { RootTabParamList, AddStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();
const AddStack = createNativeStackNavigator<AddStackParamList>();

function AddStackScreen() {
  return (
    <AddStack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <AddStack.Screen name="Home" component={HomeScreen} />
      <AddStack.Screen name="Details" component={DetailsScreen} />
    </AddStack.Navigator>
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
            } else if (route.name === 'Edit') {
              iconName = 'edit';
            } else if (route.name === 'Show') {
              iconName = 'visibility';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.redMedium,
          tabBarInactiveTintColor: TABLE_COLORS.grayDark,
        })}
        initialRouteName="Add"
      >
        <Tab.Screen name="Add" component={AddStackScreen} />
        <Tab.Screen name="Edit" component={EditScreen} />
        <Tab.Screen name="Show" component={ShowScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

