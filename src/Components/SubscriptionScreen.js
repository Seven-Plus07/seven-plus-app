import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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
    <View style={styles.container}>
      {/* ... (código para mostrar detalles de suscripciones) */}
      <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscription}>
        <Text style={styles.buttonText}>Comprar acceso</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  premiumText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  subscribeButton: {
    backgroundColor: 'gold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SubscriptionScreen;
