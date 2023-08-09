import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

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
      <View style={styles.container}>
        <Text style={styles.logo}>SevenPlus - Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <TouchableOpacity style={styles.dateContainer} onPress={toggleDatePicker}>
          <Text style={styles.dateText}>
            {birthdate ? birthdate.toDateString() : 'Fecha de nacimiento'}
          </Text>
          <FontAwesomeIcon icon={faCalendar} style={styles.calendarIcon} />
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
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  registerButton: {
    backgroundColor: 'blue',
    width: '80%',
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
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  calendarIcon: {
    fontSize: 20,
    color: 'black',
  },
});

export default RegisterScreen;

