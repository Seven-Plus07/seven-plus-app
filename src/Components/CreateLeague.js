import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


const CreateLeague = () => {
  const [leagueName, setLeagueName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [phase, setPhase] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const currentDate = new Date();
    // Validación: El nombre de la liga no debe estar vacío
    if (!leagueName.trim()) {
    alert("Por favor, ingresa el nombre de la liga.");
    return;
    }
     // Validación: La fecha de inicio no debe ser anterior a la fecha actual
    if (startDate < currentDate.setHours(0, 0, 0, 0)) {  // Se resetean horas, minutos, segundos y milisegundos a 0 para solo comparar la fecha.
    alert("La fecha de inicio no puede ser anterior a la fecha actual.");
    return;
    }
  // Validación: No debe seleccionar la opción "Seleccionar fase"
    if (phase === "Seleccione una de las opciones") {
    alert("Por favor, selecciona una fase válida.");
    return;
    }

    navigation.navigate('MyLeague');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Liga</Text>

      <Text style={styles.subtitle}>Nombre de la liga*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la liga"
        value={leagueName}
        onChangeText={setLeagueName}
      />

      <Text style={styles.subtitle}>Fecha de inicio*</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <View style={styles.dateContainer}>
          <FontAwesome5 name="calendar" size={28} color="#68707d" style={styles.icon} />
          <Text>{startDate.toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          mode="date"
          value={startDate}
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) {
              setStartDate(date);
            }
          }}
        />
      )}

      <Text style={styles.subtitle}>Fecha de finalización*</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <View style={styles.dateContainer}>
          <FontAwesome5 name="calendar" size={28} color="#68707d" style={styles.icon} />
          <Text>{endDate.toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          mode="date"
          value={endDate}
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) {
              setEndDate(date);
            }
          }}
        />
      )}
      <Text style={styles.subtitle}>Fases de liga</Text>
      <Picker
        selectedValue={phase}
        onValueChange={(itemValue) => setPhase(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccionar fase" value="Seleccione una de las" />
        <Picker.Item label="Todos contra todos" value="todosContraTodos" />
        <Picker.Item label="Todos contra todos + Eliminatoria" value="todosContraTodosEliminatoria" />
        <Picker.Item label="Eliminatoria" value="eliminatoria" />
      </Picker>


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
    backgroundColor: '#00425A', // Color de fondo del contenedor
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Color de letra
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Color de letra
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'white', // Color de letra del input
    backgroundColor: '#00425A', // Color de fondo del input, opcional si deseas que coincida con el fondo del contenedor
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
    color: 'white', // Color de letra
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: 'white', // Color del ícono, si es necesario
  },
  inputField: {
    borderWidth: 0,
    color: 'white', // Color de letra del campo de entrada de fecha
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white', // Color de letra
  },
  picker: {
    flex: 1,
    color: 'white', // Color de letra del picker, si es necesario
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
    color: 'white', // Color de letra
  },
});


export default CreateLeague;
