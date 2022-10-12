import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Welcome to login Page'}}
      />
      <Stack.Screen
        name="SignUp"
        component={LoginScreen}
        options={{title: 'Register yourself'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
