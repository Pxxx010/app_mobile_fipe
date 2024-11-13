import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import ModelosScreen from './screens/ModelosScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import AnosScreen from './screens/AnosScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Marcas' }} />
        <Stack.Screen name="Modelos" component={ModelosScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="Anos" component={AnosScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
