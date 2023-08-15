import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux'; // Importa connect de React Redux
import { setSubscription } from './Store';

const StoreScreen = ({ navigation, subscription, dispatch }) => {
  const handleSubscription = (subscriptionType) => {
    // Dispatch de la acción para actualizar la suscripción en el store
    dispatch(setSubscription(subscriptionType));
    // Navega a la pantalla de suscripción correspondiente según el tipo de suscripción
    navigation.navigate('Subscription', { subscriptionType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda</Text>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handleSubscription('navegaSinAnuncios')}
      >
        <Text style={styles.optionTitle}>Navega sin anuncios</Text>
        <Text style={styles.optionDescription}>Disfruta de Seven Plus sin que te distraigan los anuncios</Text>
        <Text style={styles.optionPrice}>$0.99 USD/mes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => handleSubscription('sevenPlusPremium')}
      >
        <Text style={styles.optionTitle}>Seven Plus Premium</Text>
        <Text style={styles.optionDescription}>Obtén Seven Plus Premium para desbloquear mejores roles y funcionalidades</Text>
        <Text style={styles.optionPrice}>$7.99 USD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00425A'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FD2525'
  },
  optionContainer: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FD2525',
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionPrice: {
    fontSize: 16,
    color: '#1F8A70',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Mapeo del estado a las propiedades del componente
const mapStateToProps = (state) => ({
  subscription: state.subscription.subscription,
});

// Conectar el componente al store
export default connect(mapStateToProps)(StoreScreen);
