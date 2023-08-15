import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InviteImage from 'SevenPlusAppTfm/assets/Invite.png'

const InvitationScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendInvitation = () => {
     // Validación para campo vacío
     if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico");
      return;
    }

    // Validación para formato de correo
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Ingresa un formato de correo electrónico válido");
      return;
    }

    Alert.alert("Éxito!", "Correo Enviado al correo proporcionado", [
      { text: "OK", onPress: () => setEmail('') }
    ]);

  };

  return (
  <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View style={styles.container}>
        <Image source={InviteImage} style={styles.image}
        />
        <Text style={styles.title}>¡Invita a tus amigos a unirse!</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
        <TouchableOpacity style={styles.button} onPress={handleSendInvitation}>
          <Text style={styles.buttonText}>Enviar Invitación</Text>
        </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#00425A',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 2,
    resizeMode: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#BFDB38',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FD2525',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default InvitationScreen;

