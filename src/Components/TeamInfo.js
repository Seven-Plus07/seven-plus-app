import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const TeamInfo = ({ navigation, route }) => {
  const placeholderLogo = "https://via.placeholder.com/150";

  const { teamName, teamIndex } = route.params;
  const [director, setDirector] = useState("");
  const [updatedTeamName, setUpdatedTeamName] = useState(teamName || "");

  const dummyPlayers = ["Jugador 1", "Jugador 2"];
  const dummyStaff = ["Staff 1", "Staff 2"];

  const handleSave = () => {
    // Logica para guardar
  };

  const handleCancel = () => {
    navigation.navigate('TeamRegistration');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: placeholderLogo }} style={styles.teamLogo} resizeMode="contain" />
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

      <Text style={styles.subtitle}>Jugadores</Text>
      {dummyPlayers.map((player, index) => (
        <Text key={index} style={styles.listItem}>
          {player}
        </Text>
      ))}

      <Text style={styles.subtitle}>Equipo Técnico</Text>
      {dummyStaff.map((staff, index) => (
        <Text key={index} style={styles.listItem}>
          {staff}
        </Text>
      ))}

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
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
    marginTop: 60,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  footerButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#00425A',
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    flex: 0.48,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
  },
  listItem: {
    fontSize: 16,
    color: "#BFDB38",
    marginLeft: 16,
    paddingTop: 5,
  },
});

export default TeamInfo;
