import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard  } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function VerificationScreen({ navigation }) {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleTextChange = (text, index) => {
    const newDigits = [...digits];
    newDigits[index] = text;

    setDigits(newDigits);

    if (text) {
        if (inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        } else {
            // Si es el último dígito, cierra el teclado
            Keyboard.dismiss();
        }
    }
  };

  const handleVerify = () => {
    // Aquí puedes agregar la lógica para verificar el código
    navigation.navigate('Mis Ligas');
  };

  return (
    <View style={styles.container}>
      <View style={styles.emailIconContainer}>
        <FontAwesome5 name="envelope" size={100} color="#BFDB38" />
      </View>
      <Text style={styles.title}>Verificación de cuenta</Text>
      <Text style={styles.description}>
        Se ha enviado un código de verificación al correo electrónico proporcionado.
      </Text>
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
    backgroundColor: '#00425A',
  },
  emailIconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#BFDB38'
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
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
    borderColor: 'gray',
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
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  verifyButton: {
    backgroundColor: '#FD2525',
    width: '60%',
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
