import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ChatScreen from './Screens/ChatScreen';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
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
        options={({route}) => ({
          title: route.params.thread.Name,
        })}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        option
        s={{title: 'Friends'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
