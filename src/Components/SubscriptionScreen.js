import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubscriptionScreen = ({ route }) => {
  const { subscriptionType } = route.params;

  const renderSubscriptionDetails = () => {
    if (subscriptionType === 'navegaSinAnuncios') {
      return (
        <View>
          <Text style={styles.title}>Juega sin anuncios</Text>
          <Text style={styles.price}>$0.99 USD/mes</Text>
          <Text style={styles.description}>Disfruta de Seven Plus sin anuncios</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.buttonText}>Suscribirse</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (subscriptionType === 'sevenPlusPremium') {
      return (
        <View>
          <Text style={styles.title}>Acceso Seven Plus <Text style={styles.premiumText}>Premium</Text></Text>
          <Text style={styles.description}>Desbloquea el rol de Admin para crear y administrar tus propias ligas!</Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.buttonText}>Comprar acceso</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderSubscriptionDetails()}
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
