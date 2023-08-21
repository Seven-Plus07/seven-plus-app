import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, Provider } from 'react-redux';
import store from './Store';  // Asumiendo que esta es la ruta correcta a tu Redux store
import AuthStack from './AuthStack';
import MainDrawer from './MainDrawer';

const RootStack = createStackNavigator();

function Navigation() {
  // Usa useSelector para obtener el estado de autenticación desde tu Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}} initialRouteName={isAuthenticated ? "MainApp" : "Auth"}>
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="MainApp" component={MainDrawer} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;


