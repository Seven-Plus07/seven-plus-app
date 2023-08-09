import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Implementar lógica para enviar correo electrónico para restablecer contraseña
    // Aquí puedes agregar la lógica para enviar el correo con un código o enlace para cambiar la contraseña
    // Puedes utilizar algún servicio de envío de correos electrónicos o una API para enviar el correo
    // Después de enviar el correo, puedes mostrar un mensaje de éxito o error
    Alert.alert('Correo enviado', 'Se ha enviado un correo electrónico para restablecer la contraseña');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SevenPlus - Olvidaste tu contraseña?</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Enviar correo</Text>
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
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  forgotPasswordButton: {
    backgroundColor: 'blue',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
