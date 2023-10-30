import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Platform, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Auth } from 'aws-amplify';

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const minDate = new Date();
  const maxDate = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);

  minDate.setFullYear(minDate.getFullYear() - 100);
  maxDate.setFullYear(maxDate.getFullYear() - 12);

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthdate(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };


  const handleRegister = async () => {
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (!email || !password || !confirmPassword || !firstName || !lastName || !birthdate) {
      Alert.alert('Error', 'Por favor, completar todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!hasNumber || !hasSpecialCharacter) {
      Alert.alert('Error', 'La contraseña debe tener al menos un número y un carácter especial.');
      return;
    }

    const birthdateDate = new Date(birthdate);
    const age = new Date().getFullYear() - birthdateDate.getFullYear();
    if (age < 12 || age > 100) {
      Alert.alert('Error', 'La edad debe estar entre 11 y 100 años');
      return;
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          birthdate: birthdate.toISOString().split('T')[0],
        },

      })
      navigation.navigate('Verification', { username: email });;

      console.log('Registrando nuevo usuario...');
      console.log('Nombre:', firstName);
      console.log('Apellido:', lastName);
      console.log('Fecha de nacimiento:', birthdate);
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
      console.log( Auth.configure() )
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <FontAwesome5 name="chevron-left" size={24} color="#FFF" />
      </TouchableOpacity>
        <Text style={styles.logo}>SevenPlus - Registro</Text>
        <Text style={styles.subtitle}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />

        <Text style={styles.subtitle}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />

        <TouchableOpacity style={styles.dateContainer} onPress={toggleDatePicker}>
          <FontAwesome5 name="calendar" size={20} color="white" style={styles.icon} />
          <Text style={styles.dateText}>
            {birthdate ? birthdate.toDateString() : 'Fecha de nacimiento'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthdate || new Date()}
            mode="date"
            display="spinner"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.subtitle}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Ingresa nueva contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <Text style={styles.subtitle}>Repite la contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00425A',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 70,
      paddingHorizontal: 20,
    },

    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'left',
      marginBottom: 14,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'left',
      marginBottom: 12,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#BFDB38',
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      color: 'white',
    },
    registerButton: {
      backgroundColor: '#FD2525',
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    registerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    dateContainer: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#BFDB38',
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateText: {
      fontSize: 16,
      color: 'white',
    },
    icon: {
      color: 'white',
    },
  });

  export default RegisterScreen;
