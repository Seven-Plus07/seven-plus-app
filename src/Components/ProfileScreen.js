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
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'react-native-image-picker';
import { Storage, API, Auth, graphqlOperation } from "aws-amplify";
import { createProfile } from "../graphql/mutations";

function ProfileScreen({ navigation }) {
  const [birthdate, setBirthdate] = useState(new Date());
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [position, setPosition] = useState("");
  const [positionPickerVisible, setPositionPickerVisible] = useState(false);
  const placeholderLogo = "https://via.placeholder.com/150";
  const [primaryPosition, setPrimaryPosition] = useState("");
  const [secondaryPosition, setSecondaryPosition] = useState("");
  const [tertiaryPosition, setTertiaryPosition] = useState("");
  const [skilledLeg, setSkilledLeg] = useState("");
  const [team, setTeam] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");

  async function getUserId() {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      return userInfo.username;
    } catch (error) {
      console.error("Error obteniendo el ID del usuario", error);
      return null;
    }
  }

  const handleSaveChanges = async () => {
    if (role && !position) {
      console.error("Si el rol está seleccionado, la posición es obligatoria");
      return;
    }

    const userId = await getUserId();
    if (!userId) {
      console.error("No se pudo obtener el ID del usuario");
      return;
    }

    const profileData = {
      UserID: userId,
      birthdate: birthdate.toISOString(),
      Role: role,
      Name: name,
      LastName: lastName,
      age: parseInt(age),
      Sex: gender,
    };

    try {
      await API.graphql(
        graphqlOperation(createProfile, { input: profileData })
      );
      console.log("Perfil guardado en DynamoDB");
    } catch (error) {
      console.error("Error al guardar el perfil en DynamoDB:", error);
    }
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  const selectImage = () => {
    const options = {
      title: "Selecciona una opción",
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("El usuario canceló la selección de imagen");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setImageUrl(response.uri);
      }
    });
  };

  const uploadProfileImage = async (file) => {
    try {
      const result = await Storage.put(file.name, file, {
        contentType: "image/jpeg", // o 'image/png' dependiendo del tipo de imagen
      });
      setImageUrl(nuevaUrl);
      console.log(result);
      alert("Imagen cargada exitosamente");
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
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
          <TextInput
            type="file"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                uploadProfileImage(e.target.files[0]);
              }
            }}
          />
          <TouchableOpacity onPress={selectImage}>
            <Image
              source={imageUrl ? { uri: imageUrl } : { uri: placeholderLogo }}
              style={{ width: 150, height: 150 }}
            />
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
                  margin: 30,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    backgroundColor: "#00425A",
                    borderRadius: 10,
                    padding: 10,
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
                    <Picker.Item label="Arbitro" value="Arbitro" color="white" />
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
            onChangeText={setName}
          />
          <Text style={styles.inputLabel}>Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text style={styles.inputLabel}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={age}
            onChangeText={setAge}
          />
          <Text style={styles.inputLabel}>Género</Text>
          <TextInput
            style={styles.input}
            placeholder="Género"
            value={gender}
            onChangeText={setGender}
          />
                    <Text style={styles.inputLabel}>Posición Primaria</Text>
          <TextInput
            style={styles.input}
            placeholder="Posición Primaria"
            value={primaryPosition}
            onChangeText={setPrimaryPosition}
          />

          <Text style={styles.inputLabel}>Posición Secundaria</Text>
          <TextInput
            style={styles.input}
            placeholder="Posición Secundaria"
            value={secondaryPosition}
            onChangeText={setSecondaryPosition}
          />

          <Text style={styles.inputLabel}>Posición Terciaria</Text>
          <TextInput
            style={styles.input}
            placeholder="Posición Terciaria"
            value={tertiaryPosition}
            onChangeText={setTertiaryPosition}
          />

          <Text style={styles.inputLabel}>Pierna Hábil</Text>
          <TextInput
            style={styles.input}
            placeholder="Pierna Hábil"
            value={skilledLeg}
            onChangeText={setSkilledLeg}
          />

          <Text style={styles.inputLabel}>Equipo</Text>
          <TextInput
            style={styles.input}
            placeholder="Equipo"
            value={team}
            onChangeText={setTeam}
          />

          <Text style={styles.inputLabel}>Número de Jugador</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Jugador"
            value={playerNumber}
            onChangeText={setPlayerNumber}
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

