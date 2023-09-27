import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const MyLeague = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Abrir Menú" onPress={() => navigation.openDrawer()} />
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
  };

  return (
    <TouchableOpacity style={styles.optionContainer} onPress={handlePress}>
      <FontAwesome5 name={icon} size={24} color="#FD2525" style={styles.icon} />
      <Text style={styles.optionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00425A',
    padding: 20,
    marginTop: 50,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BFDB38',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 15,
  },
  optionLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MyLeague;
