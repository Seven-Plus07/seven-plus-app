import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, ScrollView } from 'react-native';

const Classification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');


  const addTeam = () => {
      if (teamName.trim() === '') {
        setError('No puedes dejar este campo vacío.');
        return;
      }
    const newTeam = {
      id: teams.length.toString(),
      name: teamName,
      pts: 0,
      j: 0,
      g: 0,
      e: 0,
      p: 0,
      gf: 0,
      gc: 0,
      dif: 0,
      percentage: 0,
      pe: 0
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setModalVisible(false);
    setTeamName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CLASIFICACION</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Agregar Equipos +</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para agregar equipo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <TextInput
                 placeholder="Nombre del equipo"
                 style={styles.inputContainer}
                 value={teamName}
                 onChangeText={setTeamName}
               />
                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                <Button title="Confirmar" onPress={addTeam} />
                <Button title="Cancelar" onPress={() => { setError(''); setModalVisible(false); }} />
             </View>
          </View>
      </Modal>

      {teams.length > 0 && (
      <ScrollView style={styles.scrollViewContainer}>
          <View>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Pos</Text>
              <Text style={styles.columnHeader}>EQUIPOS</Text>
              <Text style={styles.columnHeader}>Pts</Text>
              <Text style={styles.columnHeader}>J</Text>
              <Text style={styles.columnHeader}>G</Text>
              <Text style={styles.columnHeader}>E</Text>
              <Text style={styles.columnHeader}>P</Text>
              <Text style={styles.columnHeader}>GF</Text>
              <Text style={styles.columnHeader}>GC</Text>
              <Text style={styles.columnHeader}>DIF</Text>
              <Text style={styles.columnHeader}>%</Text>
              <Text style={styles.columnHeader}>PE</Text>
            </View>
            {teams.map((team, index) => (
              <View key={team.id} style={styles.teamRow}>
                <Text style={styles.cell}>{index + 1}</Text>
                <Text style={styles.cell}>{team.name}</Text>
                <Text style={styles.cell}>{team.pts}</Text>
                <Text style={styles.cell}>{team.j}</Text>
                <Text style={styles.cell}>{team.g}</Text>
                <Text style={styles.cell}>{team.e}</Text>
                <Text style={styles.cell}>{team.p}</Text>
                <Text style={styles.cell}>{team.gf}</Text>
                <Text style={styles.cell}>{team.gc}</Text>
                <Text style={styles.cell}>{team.dif}</Text>
                <Text style={styles.cell}>{team.percentage}</Text>
                <Text style={styles.cell}>{team.pe}</Text>
              </View>
              ))}
           </View>
       </ScrollView>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    width:'50%',
    alignItems: 'right',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // fondo gris semi-transparente
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  inputContainer: {
    borderColor: '#EDEDED',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  teamRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
});

export default Classification;
