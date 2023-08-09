import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerMenu = (props) => {
  const { state, ...rest } = props;

  // Verificar si el usuario ha iniciado sesión
  const isUserLoggedIn = true; // Puedes cambiar esto según tu lógica de autenticación

  // Filtrar las rutas para mostrar solo las relevantes
  const filteredRoutes = state.routes.filter((route) => {
    // Aquí agregas los nombres de las pantallas que quieres ocultar en el drawer
    const hiddenScreens = ['Login', 'Register', 'ForgotPassword'];

    // Si el usuario ha iniciado sesión, muestra todas las rutas
    if (isUserLoggedIn) {
      return true;
    }

    // Si el usuario no ha iniciado sesión, oculta las rutas de login, register y forgot password
    return !hiddenScreens.includes(route.name);
  });

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.username}>Nombre de Usuario</Text>
        {/* Aquí puedes agregar el icono de la foto de perfil */}
      </View>
      <DrawerItemList state={{ ...state, routes: filteredRoutes }} {...rest} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: 'lightgray',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DrawerMenu;
