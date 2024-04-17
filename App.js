// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import CatFactsScreen from './CatFactsScreen';
import Me from './Me';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Me" component={Me} />
        <Stack.Screen name="CatFacts" component={CatFactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
