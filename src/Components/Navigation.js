// Se importan dependencias de navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AuthStack from './AuthStack'; // Importa tu AuthStack aquí

// Se importan las ventanas necesarias
import MyLeaguesScreen from './MyLeaguesScreen';
import ProfileScreen from './ProfileScreen';
import StoreScreen from './StoreScreen';
import store from './Store'; // Importa el store de Redux
import SubscriptionScreen from './SubscriptionScreen'; // Importa la pantalla SubscriptionScreen
import InvitationScreen from './InvitationScreen';
import SettingsScreen from './SettingsScreen';


const Drawer = createDrawerNavigator();

function Navigation() {
  return (
    // Envuelve el componente NavigationContainer con el Provider de Redux y utiliza el store
    <Provider store={store}>
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Bienvenido">
        <Drawer.Screen name="Bienvenido" component={AuthStack} options={{
              drawerLabel: () => null,}} />
          <Drawer.Screen name="Mis Ligas" component={MyLeaguesScreen} />
          <Drawer.Screen name="Mi Perfil" component={ProfileScreen} />
          <Drawer.Screen name="Tienda" component={StoreScreen} />
          <Drawer.Screen name="Invitar amigos" component={InvitationScreen} />
          <Drawer.Screen name="Configuración" component={SettingsScreen} />
          <Drawer.Screen name="Subscription" component={SubscriptionScreen} options={{
              drawerLabel: () => null,}} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;

