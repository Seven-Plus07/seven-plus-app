import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="upload" size={40} color="black" style={styles.icon} />
      <Text style={styles.username}>Seven Test</Text>
      <Button title="Cerrar Sesión" onPress={() => Alert.alert(
        'Confirmación de Cierre de Sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: handleLogout },
        ]
      )} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SettingsScreen;


