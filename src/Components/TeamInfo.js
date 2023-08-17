// TeamInfo.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const TeamInfo = ({ navigation, route }) => {
  // Usando un placeholder para el logo del equipo por ahora
  const placeholderLogo = "https://via.placeholder.com/150";

  const { teamName, teamIndex } = route.params;
  const [director, setDirector] = useState(""); // Corregido aquí
  const [name, setName] = useState(teamName || "");
  const [updatedTeamName, setUpdatedTeamName] = useState("");

  const handleSave = () => {
    navigation.setParams({
      updatedTeamName: name,
      teamIndex,
    });
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: placeholderLogo }}
        style={styles.teamLogo}
        resizeMode="contain"
      />
      <Text style={styles.label}>Nombre del Equipo</Text>
      <TextInput
        style={styles.input}
        value={updatedTeamName}
        onChangeText={(text) => setUpdatedTeamName(text)}
        placeholder="Nombre del equipo"
      />
      <Text style={styles.label}>Director Técnico</Text>
      <TextInput
        style={styles.input}
        value={director}
        onChangeText={setDirector}
        placeholder="Director Técnico"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Jugadores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Equipo Técnico</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button title="Guardar" onPress={handleSave} />
          <Button title="Cancelar" onPress={handleCancel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#00425A",
  },
  teamLogo: {
    width: 150,
    height: 150,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BFDB38",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    color: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    padding: 10,
    backgroundColor: "#FD2525",
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TeamInfo;
