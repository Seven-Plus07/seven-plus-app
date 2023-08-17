// Se importan las ventanas necesarias
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyLeaguesScreen from './MyLeaguesScreen';
import ProfileScreen from './ProfileScreen';
import StoreScreen from './StoreScreen';
import InvitationScreen from './InvitationScreen';
import SettingsScreen from './SettingsScreen';
import TeamRegistration from './TeamRegistration';
import PremiumAccessScreen from './PremiumAccessScreen';

const Drawer = createDrawerNavigator();


function MainDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#00425A',
          },
          drawerLabelStyle: {
            color: '#1F8A70',
          },
          headerStyle: {
            backgroundColor: '#BFDB38',
          },
        }}
      >
        <Drawer.Screen name="Mis Ligas" component={MyLeaguesScreen} />
        <Drawer.Screen name="Premium" component={PremiumAccessScreen} />
        <Drawer.Screen name="Registro de Equipos" component={TeamRegistration} />
        <Drawer.Screen name="Mi Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Tienda" component={StoreScreen} />
        <Drawer.Screen name="Invitar amigos" component={InvitationScreen} />
        <Drawer.Screen name="Configuración" component={SettingsScreen} />
      </Drawer.Navigator>
    );
  }

export default MainDrawer;

