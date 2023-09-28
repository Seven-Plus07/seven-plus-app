import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import ForgotPasswordImage from 'SevenPlusAppTfm/assets/ForgotPassword.png'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function ForgotPasswordScreen(){
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleForgotPassword = () => {
    // Si el email está vacío
    if (!email.trim()) {
      setErrorMessage('Por favor, ingresa un correo electrónico.');
      return;
    }

     // Verificar si el correo es válido usando la expresión regular
     if (!emailRegex.test(email)) {
      setErrorMessage('Correo electrónico no válido');
      return; // Detener el proceso de inicio de sesión
    }

    navigation.navigate('Reset Password');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <FontAwesome5 name="chevron-left" size={24} color="#FFF" />
      </TouchableOpacity>
       <Image source={ForgotPasswordImage} style={styles.image}
       />
      <Text style={styles.logo}>SevenPlus - Olvidaste tu contraseña?</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
    backgroundColor: '#00425A',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 2,
    resizeMode: 'center',
  },
  logo: {
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 2,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  forgotPasswordButton: {
    backgroundColor: '#FD2525',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
