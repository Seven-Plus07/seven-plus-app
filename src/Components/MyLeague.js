import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MyLeague = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Option label="Clasificación" icon="list-ol" navigation={navigation} />
      <Option label="Rankings" icon="trophy" />
      <Option label="Fotos y videos" icon="images" />
      <Option label="Configuración" icon="cogs" />
    </View>
  );
};

const Option = ({ label, icon, navigation }) => {
  const handlePress = () => {
    if (label === 'Clasificación' && navigation) {
      navigation.navigate('Classification');
    }
    // Aquí puedes agregar más condiciones para otras opciones si es necesario
  };

  return (
    <TouchableOpacity style={styles.optionContainer} onPress={handlePress}>
      <FontAwesome5 name={icon} size={24} color="#FFA500" style={styles.icon} />
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 15,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MyLeague;
