import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ChatScreen from './Screens/ChatScreen';

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
        option
        s={{title: 'Register yourself'}}
      />
      <Stack.Screen
        name="HomePage"
        component={ChatScreen}
        option
        s={{title: 'Chat with your loved ones...'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
