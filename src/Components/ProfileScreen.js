import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "react-native-image-picker";
import { Storage } from "@aws-amplify/storage";

function ProfileScreen() {
  const [birthdate, setBirthdate] = useState(new Date());
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [alias, setAlias] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleSaveChanges = async () => {
    console.log("Guardando cambios...");
    console.log("Fecha de nacimiento:", birthdate);
    console.log("Rol:", role);
    console.log("País:", country);
    console.log("Alias:", alias);

    // Almacena los datos en un archivo en un bucket de S3
    const data = {
      Nombre: "Tu Nombre",
      Apellido: "Tu Apellido",
      Edad: 30, // Tu edad
      Sexo: "Masculino", // Tu género
      Posición: role === "Jugador" ? "Portero" : "", // Determina la posición en función del rol
      Defensa: role === "Jugador" ? "Defensa central, lateral, libre y carrilero" : "",
      Centrocampista: role === "Jugador" ? "Pivote, media punta, volante e interior" : "",
      Delantero: role === "Jugador" ? "Segundo delantero, delantero centro y extremo" : "",
    };

    try {
      // Almacena los datos en un archivo en el bucket de S3
      await Storage.put("profile-data.txt", JSON.stringify(data), {
        level: "protected",
        contentType: "text/plain",
      });

      // Navega hacia atrás
      // Inserta aquí el código para navegar hacia atrás si estás utilizando una librería de navegación
    } catch (error) {
      console.error("Error al guardar datos en S3:", error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  const [avatarSource, setAvatarSource] = useState(null);

  const selectPhotoTapped = () => {
    const options = {
      title: "Selecciona una foto",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        setAvatarSource(source);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={selectPhotoTapped}>
            {avatarSource === null ? (
              <FontAwesome5 name="user-circle" size={80} color="white" />
            ) : (
              <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={avatarSource} />
                <FontAwesome5
                  name="camera"
                  size={20}
                  color="white"
                  style={styles.cameraIcon}
                />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.header}>Mi Perfil</Text>
          <View style={styles.dateContainer}>
            <FontAwesome5
              name="calendar"
              size={20}
              color="#FD2525"
              style={styles.icon}
            />
            {showDatePicker ? (
              <DateTimePicker
                mode="date"
                value={birthdate}
                display="default"
                onChange={onChangeDate}
              />
            ) : (
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.subtitle}>
                  {birthdate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isPickerVisible && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={isPickerVisible}
              onRequestClose={() => setPickerVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margintop: 30,
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
                }}
              >
                <View
                  style={{
                    width: "80%",
                    backgroundColor: "#00425A",
                    borderRadius: 10,
                    padding: 10, // Agregar padding
                  }}
                >
                  <Picker
                    style={{ width: "100%", color: "white" }}
                    selectedValue={role}
                    onValueChange={(itemValue) => {
                      setRole(itemValue);
                      setPickerVisible(false);
                    }}
                  >
                    <Picker.Item
                      label="Selecciona un rol"
                      value=""
                      color="white"
                    />
                    <Picker.Item
                      label="Jugador"
                      value="Jugador"
                      color="white"
                    />
                    <Picker.Item label="DT" value="DT" color="white" />
                    <Picker.Item label="Veedor" value="Veedor" color="white" />
                  </Picker>
                </View>
              </View>
            </Modal>
          )}
          <Text style={styles.inputLabel}>Rol</Text>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={styles.input}
          >
            <Text style={{ color: 'white', textAlign: 'left', marginTop: 10, }}>
              {role ? role : "Selecciona un rol"}</Text>
          </TouchableOpacity>
          <Text style={styles.inputLabel}>País</Text>
          <TextInput
            style={styles.input}
            placeholder="País"
            value={country}
            onChangeText={setCountry}
          />
          <Text style={styles.inputLabel}>Alias</Text>
          <TextInput
            style={styles.input}
            placeholder="Alias"
            value={alias}
            onChangeText={setAlias}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00425A",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#BFDB38",
    borderRadius: 8,
    marginBottom: 18,
    paddingHorizontal: 18,
    color: "white",
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "#FD2525",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    left: "auto",
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginBottom: 5,
  },
  avatarContainer: {
    marginBottom: 16,
    position: "relative",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default ProfileScreen;
