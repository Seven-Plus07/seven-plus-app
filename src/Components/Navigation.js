import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerificationScreen from './VerificationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import MyLeaguesScreen from './MyLeaguesScreen';
import ProfileScreen from './ProfileScreen';
import StoreScreen from './StoreScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MenuScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mis Ligas" component={MyLeaguesScreen} />
      <Stack.Screen name="Mi Perfil" component={ProfileScreen} />
      <Stack.Screen name="Tienda" component={StoreScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Verification" component={VerificationScreen} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Drawer.Screen name="Menu" component={MenuScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

