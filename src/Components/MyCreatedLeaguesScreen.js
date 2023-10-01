import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Storage } from '@aws-amplify/storage';

const MyCreatedLeaguesScreen = ({ navigation }) => {
  const [createdLeagues, setCreatedLeagues] = useState([]);

  useEffect(() => {
    // Aquí debes cargar la lista de ligas creadas por el usuario desde tu bucket S3.
    // Puedes usar la función Storage.get() para obtener la información de las ligas.

    async function loadCreatedLeagues() {
      try {
        const response = await Storage.get('liga-info.txt', {
          level: 'protected',
          contentType: 'text/plain',
        });
        if (response) {
          const leagueData = JSON.parse(response);
          setCreatedLeagues([leagueData]);
        }
      } catch (error) {
        console.error('Error al cargar las ligas:', error);
      }
    }

    loadCreatedLeagues();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Mis Ligas Creadas</Text>
      <FlatList
        data={createdLeagues}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.leagueItem}>
            <Text style={styles.leagueName}>{item.name}</Text>
            {/* Mostrar más detalles de la liga aquí */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00425A',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 16,
  },
  leagueItem: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 4,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00425A',
  },
});

export default MyCreatedLeaguesScreen;

