import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";



const NoAdsScreen = ({ route, navigation }) => {
  const { subscriptionType } = route.params;

  const handleSubscription = () => {
    if (subscriptionType === "navegaSinAnuncios") {
      Alert.alert(
        "Confirmación de compra",
        "¿Deseas comprar la opción para Navega sin anuncios por $0.99 USD/mes?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("MainApp");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('SevenPlusAppTfm/assets/NoAds.png')} style={styles.image} />
      <Text style={styles.description}>
        Disfruta de la aplicación sin anuncios molestos
      </Text>
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={handleSubscription}
      >
        <Text style={styles.buttonText} onPress={handleSubscription} >Comprar suscripción</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00425A",
  },
  description: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    color: "white",
    fontWeight: 'bold'
  },
  subscribeButton: {
    backgroundColor: "gold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  image: {
    width: 400,        // Establece el ancho de la imagen
    height: 400,       // Establece el alto de la imagen
    resizeMode: 'contain' // Asegura que la imagen mantenga su relación de aspecto original
  },
});

export default NoAdsScreen;
