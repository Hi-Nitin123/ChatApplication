import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Welcome to login Page'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: 'Register yourself'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
