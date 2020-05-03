import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HelpScreen from '../../screens/primary/Help';

const Stack = createStackNavigator();

const HelpStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="help-screen"
      component={HelpScreen}
      options={{
        title: 'Help',
      }}
    />
  </Stack.Navigator>
);

export default HelpStack;
