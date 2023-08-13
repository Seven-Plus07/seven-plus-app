import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import PremiumAccessScreen from './PremiumAccessScreen';
import CreateLeague from './CreateLeague';
import MyLeague from './MyLeague';
import ClassificationScreen from './ClassificationScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Premium" component={PremiumAccessScreen} />
      <Stack.Screen name="Create League" component={CreateLeague} />
      <Stack.Screen name="MyLeague" component={MyLeague} />
      <Stack.Screen name="Classification" component={ClassificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

