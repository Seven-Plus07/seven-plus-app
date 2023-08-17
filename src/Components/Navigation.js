import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './Store'; // Asegúrate de tener la ruta correcta
import AuthStack from './AuthStack';
import MainDrawer from './MainDrawer';

const RootStack = createStackNavigator();

function Navigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Auth">
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="MainApp" component={MainDrawer} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;

