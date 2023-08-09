import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { authenticateUser } from './AuthenticationTest';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isAuthenticated = authenticateUser(email, password);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    // Verificar si el correo es válido usando la expresión regular
    if (!emailRegex.test(email)) {
      setErrorMessage('Correo electrónico no válido');
      return; // Detener el proceso de inicio de sesión
    }

    // Verificar credenciales con la función ficticia de autenticación
    if (isAuthenticated) {
    // Credenciales válidas, puedes continuar con la lógica de navegación o autenticación
        console.log('Iniciando sesión como:', email);
        console.log('Contraseña:', password);
        setErrorMessage('');
        navigation.navigate('Mis Ligas');
        // Aquí puedes agregar la lógica para continuar con la navegación o autenticación
      } else {
         // Credenciales inválidas, mostrar mensaje de error
        setErrorMessage('Correo electrónico o contraseña incorrectos');
        return;
     }

    setErrorMessage('');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navegar a la pantalla de restablecimiento de contraseña
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.logo}>SevenPlus</Text>
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
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
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
  loginButton: {
    backgroundColor: 'blue',
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
    borderColor: 'blue',
    marginBottom: 16,
  },
  registerText: {
    color: 'blue',
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
    color: 'blue',
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
