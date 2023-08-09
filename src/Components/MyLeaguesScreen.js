import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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

      <View style={styles.imageContainer}>
        <Image
          source={require('SevenPlusAppTfm/src/Images/Cup.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.inscribirseButton} onPress={handleInscribirsePress}>
          <Text style={styles.inscribirseButtonText}>Inscríbete a una liga</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  inscribirseButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  inscribirseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyLeaguesScreen;
