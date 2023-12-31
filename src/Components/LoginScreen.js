import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import logoImage from '../../assets/logo.png';
import { Auth } from 'aws-amplify';

function LoginScreen({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Verificar si el correo es válido usando la expresión regular
    if (!emailRegex.test(email)) {
      setErrorMessage('Correo electrónico no válido');
      return; // Detener el proceso de inicio de sesión
    }

    // Verificar credenciales con AWS Amplfy
    try {
      await Auth.signIn(email, password);
      setErrorMessage('');
      navigation.navigate('MainApp');
    } catch (error) {
      console.error('Error signing in', error);
      setErrorMessage('Correo electrónico y/o contraseña incorrectos');
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <View style={styles.container}>
        <Image source={logoImage} style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00425A',
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 2,
    resizeMode: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#BFDB38',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDB38',
    marginBottom: 16,
  },
  registerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  forgotPasswordText: {
    color: '#BFDB38',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default LoginScreen;
