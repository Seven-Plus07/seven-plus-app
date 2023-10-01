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
  Image,
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
  const [name, setName] = useState(""); // Estado para el nombre
  const [lastName, setLastName] = useState(""); // Estado para el apellido
  const [age, setAge] = useState(""); // Estado para la edad
  const [gender, setGender] = useState(""); // Estado para el sexo
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleSaveChanges = async () => {
    console.log("Guardando cambios...");
    console.log("Fecha de nacimiento:", birthdate);
    console.log("Rol:", role);
    console.log("Nombre:", name);
    console.log("Apellido:", lastName);
    console.log("Edad:", age);
    console.log("Sexo:", gender);

    const data = {
      Rol: role,
      Nombre: name,
      Apellido: lastName,
      Edad: age,
      Sexo: gender,
    };
    try {
      // Almacena los datos en un archivo en el bucket de S3
      await Storage.put("profile-data.txt", JSON.stringify(data), {
        level: "protected",
        contentType: "text/plain",
      });
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

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const { uri } = response;
        const fileName = `profile-${Date.now()}.jpg`; // Nombre de archivo único

        try {
          // Subir la imagen al bucket de S3
          const result = await Storage.put(fileName, uri, {
            level: "protected", // Ajusta esto según tus necesidades
            contentType: "image/jpeg", // Ajusta el tipo de contenido según el formato de la imagen
          });

          // `result.key` contiene la clave del objeto en S3, que puedes almacenar en tu base de datos si es necesario

          const source = { uri: uri };
          setAvatarSource(source); // Actualiza la fuente de la imagen de perfil

          console.log("Imagen almacenada en S3 con éxito:", result.key);
        } catch (error) {
          console.error("Error al subir imagen a S3:", error);
        }
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
                <Image style={styles.avatar} source={avatarSource} />{" "}
                {/* Mostrar la imagen de perfil */}
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
            <Text style={{ color: "white", textAlign: "left", marginTop: 10 }}>
              {role ? role : "Selecciona un rol"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName} // Manejo del estado del nombre
          />
          <Text style={styles.inputLabel}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName} // Manejo del estado del apellido
          />
          <Text style={styles.inputLabel}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={age}
            onChangeText={setAge} // Manejo del estado de la edad
          />
          <Text style={styles.inputLabel}>Sexo</Text>
          <TextInput
            style={styles.input}
            placeholder="Sexo"
            value={gender}
            onChangeText={setGender} // Manejo del estado del sexo
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
