import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import cupImage from 'SevenPlusAppTfm/assets/cup.png'

const MyLeaguesScreen = () => {
  const handleMenuPress = () => {
    // Aquí puedes implementar la lógica para navegar a la pantalla de opciones del menú
    // Por ejemplo, puedes utilizar react-navigation para navegar a otra pantalla
  };

  const handleInscribirsePress = () => {
    // Aquí puedes implementar la lógica para inscribir al usuario en una liga
    // Por ejemplo, puedes mostrar un modal o navegar a la pantalla de inscripción
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
        {/* Aquí puedes agregar el icono de menú */}
      </TouchableOpacity>
      <Text style={styles.headerText}>Seven Plus</Text>
      <Text style={styles.subHeaderText}>Mis Ligas</Text>

      {/* Si el usuario no está inscrito, mostrar la imagen y el botón para inscribirse */}
      {/* Si ya está inscrito, mostrar las ligas en las que está inscrito */}
      <Image source={cupImage} style={styles.image}
        />
        <TouchableOpacity style={styles.inscribirseButton} onPress={handleInscribirsePress}>
          <Text style={styles.inscribirseButtonText}>Inscríbete a una liga</Text>
        </TouchableOpacity>
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
