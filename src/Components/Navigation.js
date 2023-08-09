// Se importan dependencias de navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Se importan las ventanas necesarias
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerificationScreen from './VerificationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import MyLeaguesScreen from './MyLeaguesScreen';
import ProfileScreen from './ProfileScreen';
import StoreScreen from './StoreScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="AuthStack">
        <Drawer.Screen
          name="Bienvenido!"
          component={AuthStack}
          options={{
            drawerLabel: () => null, // Oculta el label de AuthStack dentro del menu
          }}
        />
        <Drawer.Screen name="Mis Ligas" component={MyLeaguesScreen} />
        <Drawer.Screen name="Mi Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Tienda" component={StoreScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
