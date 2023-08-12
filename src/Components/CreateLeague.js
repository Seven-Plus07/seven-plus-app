import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CreateLeague = () => {
  const [leagueName, setLeagueName] = useState('');
  const initialStartDate = new Date();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState('');
  const [clubName, setClubName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    // Puedes utilizar los valores almacenados en los estados para enviar la información
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Liga</Text>
      <Text style={styles.subtitle}>Nombre de la liga*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la liga*"
        value={leagueName}
        onChangeText={setLeagueName}
      />
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Fecha de inicio*</Text>
        <View style={styles.datePickerContainer}>
          <FontAwesome5 name="calendar" size={20} color="#68707d" style={styles.icon} />
          <DateTimePicker
            style={styles.inputField}
            date={startDate}
            mode="date"
            format="YYYY-MM-DD"
            value={new Date()} // Evita seleccionar fechas anteriores al día de hoy
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
            }}
            onDateChange={(date) => setStartDate(date)}
          />
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Fecha de finalización*</Text>
        <View style={styles.datePickerContainer}>
          <FontAwesome5 name="calendar" size={20} color="#68707d" style={styles.icon} />
          <DateTimePicker
            style={styles.inputField}
            date={endDate}
            mode="date"
            format="YYYY-MM-DD"
            value={new Date()} // Evita seleccionar fechas anteriores al día de hoy
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
            }}
            onDateChange={(date) => setEndDate(date)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Liga</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    borderWidth: 0,
  },
  submitButton: {
    backgroundColor: '#fd2525',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CreateLeague;
