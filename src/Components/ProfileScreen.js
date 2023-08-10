import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function ProfileScreen() {
  const [birthdate, setBirthdate] = useState('01/01/1990'); // Fecha de nacimiento inicial
  const [role, setRole] = useState('Jugador'); // Rol inicial
  const [country, setCountry] = useState(''); // País inicial
  const [alias, setAlias] = useState(''); // Alias inicial

  const handleSaveChanges = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en la información del usuario
    // Por ejemplo, puedes enviar los datos a un backend para actualizar el perfil
    console.log('Guardando cambios...');
    console.log('Fecha de nacimiento:', birthdate);
    console.log('Rol:', role);
    console.log('País:', country);
    console.log('Alias:', alias);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de Nacimiento"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Alias"
        value={alias}
        onChangeText={setAlias}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
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
  header: {
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
  saveButton: {
    backgroundColor: 'blue',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
