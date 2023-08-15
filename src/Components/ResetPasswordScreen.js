import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';

function ResetPasswordScreen({ navigation }) {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [newPassword, setNewPassword] = useState('');

  const handleTextChange = (text, index) => {
    const newDigits = [...digits];
    newDigits[index] = text;

    setDigits(newDigits);

    if (text && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    } else if (index === 5 && text) {
      Keyboard.dismiss(); // esconde el teclado al llegar al último cuadro
    }
  };

  const handleResetPassword = () => {
    const isCompleteVerificationCode = digits.every(digit => digit !== '');

    const hasNumber = /\d/.test(newPassword);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword);

    if (!isCompleteVerificationCode) {
      Alert.alert('Error', 'Por favor, completa el código de verificación.');
      return;
    }

    if (newPassword === '') {
      Alert.alert('Error', 'La nueva contraseña no puede estar vacía.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!hasNumber || !hasSpecialCharacter) {
      Alert.alert('Error', 'La contraseña debe tener al menos un número y un carácter especial.');
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el código</Text>
      <View style={styles.codeInputContainer}>
        {Array(6).fill().map((_, index) => (
          <TextInput
            key={index}
            ref={ref => inputsRef.current[index] = ref}
            style={styles.digitInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={text => handleTextChange(text, index)}
            value={digits[index]}
          />
        ))}
      </View>
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  digitInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#BFDB38',
    borderRadius: 8,
    marginHorizontal: 5,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
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

