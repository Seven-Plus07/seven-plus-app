import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import cupImage from '../../assets/cup.png';
import MyLeague from './MyLeague';

const MyLeaguesScreen = ({ navigation }) => {
  const [hasLeague, setHasLeague] = useState(false); // Asume que no hay liga creada al inicio

  const handleMenuPress = () => {
    navigation.openDrawer(); // Abre el Drawer
  };

  const handleInscribirsePress = () => {
      navigation.navigate('MyCreatedLeaguesScreen'); // Navega a la nueva pantalla
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
      </TouchableOpacity>
      <Text style={styles.headerText}>Seven Plus</Text>
      <Text style={styles.subHeaderText}>Mis Ligas</Text>

       {hasLeague ? (
        <MyLeague navigation={navigation} />
       ) : (
         <>
      <Image source={cupImage} style={styles.image}
        />
        <TouchableOpacity style={styles.inscribirseButton} onPress={handleInscribirsePress}>
          <Text style={styles.inscribirseButtonText}>Inscríbete a una liga</Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00425A',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  subHeaderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 600,
    height: 600,
    marginBottom: 2,
  },
  inscribirseButton: {
    backgroundColor: '#FD2525',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  inscribirseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,


  },
});

export default MyLeaguesScreen;
