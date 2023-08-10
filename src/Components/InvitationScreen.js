import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const InvitationScreen = () => {
  const [email, setEmail] = useState('');

  const handleSendInvitation = () => {
    // Aquí puedes implementar la lógica para enviar la invitación por correo o generar un enlace
    // Puedes usar bibliotecas como SendGrid para enviar correos electrónicos o generar enlaces únicos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invitar a unirse a la plataforma</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar Invitación" onPress={handleSendInvitation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default InvitationScreen;
