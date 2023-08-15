// ResetPasswordScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function ResetPasswordScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    // Aquí puedes verificar el código y restablecer la contraseña
    // Si todo es correcto, puedes navegar al inicio de sesión o donde desees
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el código</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Restablecer contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00425A',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BFDB38',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  resetButton: {
    backgroundColor: '#FD2525',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ResetPasswordScreen;
