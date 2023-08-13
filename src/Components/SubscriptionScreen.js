import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';


const SubscriptionScreen = ({ route, navigation }) => {
  const { subscriptionType } = route.params;

  const handleSubscription = () => {
    let subscriptionDescription = '';
    let subscriptionPrice = '';

    if (subscriptionType === 'navegaSinAnuncios') {
      subscriptionDescription = 'Juega sin anuncios';
      subscriptionPrice = '$0.99 USD/mes';
    } else if (subscriptionType === 'sevenPlusPremium') {
      subscriptionDescription = 'Acceso Seven Plus Premium';
      subscriptionPrice = '$7.99 USD';
    }

    // Mostrar una alerta de confirmación de compra
    Alert.alert(
      'Confirmación de compra',
      `¿Deseas comprar ${subscriptionDescription} por ${subscriptionPrice}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (subscriptionType === 'navegaSinAnuncios') {
              // Lógica para suscripción sin anuncios
            } else if (subscriptionType === 'sevenPlusPremium') {
              navigation.navigate('Premium'); // Navegar a la pantalla de acceso premium
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.description}>
        Con Seven Plus Premium, puedes crear ligas, administrar inscripciones de equipos, ingresar estadísticas, y disfrutar de muchas funcionalidades más. ¡Eleva tu experiencia al siguiente nivel!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscription}>
          <Text style={styles.buttonText}>Comprar acceso</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  premiumText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
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






