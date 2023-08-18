import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const PremiumAccessScreen = ({ navigation }) => {
  const handleCreateLeague = () => {
    // Lógica para crear una nueva liga
    navigation.navigate('Create League');
  };

  const handleManageLeagues = () => {
    // Lógica para administrar mis ligas existentes
  };

  const handleSendMessage = () => {
    // Lógica para enviar mensaje a inscritos en la liga
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionContainer} onPress={handleCreateLeague}>
        <Text style={styles.optionText}>Crear una Liga</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleManageLeagues}>
        <Text style={styles.optionText}>Administrar Mis Ligas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleSendMessage}>
        <Text style={styles.optionText}>Enviar Mensaje a Inscritos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00425A"
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#BFDB38',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#BFDB38',
  },
});

export default PremiumAccessScreen;
