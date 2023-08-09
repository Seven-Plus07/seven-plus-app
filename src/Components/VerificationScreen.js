import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function VerificationScreen({ navigation }) {
  // Aquí puedes implementar la lógica para enviar el código de verificación al correo electrónico del usuario

  const handleVerify = () => {
    // Aquí puedes implementar la lógica para verificar el código ingresado por el usuario y completar el proceso de verificación
    // Si el código es correcto, puedes navegar a la siguiente pantalla
    // Por ejemplo:
    navigation.navigate('¡Bienvenido!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de cuenta</Text>
      <Text style={styles.description}>
        Se ha enviado un código de verificación al correo electrónico proporcionado.
      </Text>
      {/* Aquí puedes agregar un campo para que el usuario ingrese el código */}
      {/* Por ejemplo: */}
      {/* <TextInput
        style={styles.input}
        placeholder="Código de verificación"
      /> */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  verifyButton: {
    backgroundColor: 'blue',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
