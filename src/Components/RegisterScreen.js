import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function RegisterScreen({navigation}) {
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
      setShowDatePicker(false); // Ocultar el calendario después de seleccionar una fecha
    }
  };

  const handleRegister = () => {
    // Validar campos obligatorios
    if (!email || !password || !confirmPassword || !firstName || !lastName || !birthdate) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Validar la edad del usuario
    const birthdateDate = new Date(birthdate);
    const age = new Date().getFullYear() - birthdateDate.getFullYear();
    if (age < 12 || age > 100) {
      Alert.alert('Error', 'La edad debe estar entre 12 y 100 años');
      return;
    }

    // Navegar a la pantalla de verificación después de un registro exitoso
    navigation.navigate('Verification');

    // Implementar lógica de registro aquí
    // Por ejemplo, puedes enviar los datos a un backend para crear el nuevo usuario
    console.log('Registrando nuevo usuario...');
    console.log('Nombre:', firstName);
    console.log('Apellido:', lastName);
    console.log('Fecha de nacimiento:', birthdate);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
  };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
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

          <Text style={styles.subtitle}>Repite contraseña</Text>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00425A',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'left',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'left',
      marginBottom: 8,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#BFDB38',
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      color: 'white', // Para que el texto ingresado sea blanco
    },
    registerButton: {
      backgroundColor: '#FD2525',
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 16,
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
