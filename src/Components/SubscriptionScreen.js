import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const SubscriptionScreen = ({ route, navigation }) => {
  const { subscriptionType } = route.params;

  const handleSubscription = () => {
    if (subscriptionType === 'sevenPlusPremium') {
      // Mostrar alerta para "Seven Plus Premium"
      Alert.alert(
        'Confirmación de compra',
        '¿Deseas comprar Acceso Seven Plus Premium por $7.99 USD?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MainApp'); // Navegar a la pantalla de acceso premium
            }
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Premium.png')} style={styles.image} />
      <Text style={styles.description}>
        Con Seven Plus Premium, puedes crear ligas, administrar inscripciones de equipos, ingresar estadísticas, y disfrutar de muchas funcionalidades más. ¡Eleva tu experiencia al siguiente nivel!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscription}>
          <Text style={styles.buttonText}>Comprar acceso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',  // Centra los elementos en el eje vertical
    alignItems: 'center',      // Centra los elementos en el eje horizontal
    backgroundColor: '#00425A'
  },
  image: {
    width: 300,        // Establece el ancho de la imagen
    height: 300,       // Establece el alto de la imagen
    marginBottom: 14,  // Agrega un margen en la parte inferior para separarla del texto
    resizeMode: 'contain' // Asegura que la imagen mantenga su relación de aspecto original
  },
  description: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default SubscriptionScreen;
