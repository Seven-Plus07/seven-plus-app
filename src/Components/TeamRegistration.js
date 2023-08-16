import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TeamRegistration = () => {
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);

    const handleAddTeam = () => {
        if (teamName.trim() !== '') {
            setTeams([...teams, teamName]);
            setTeamName('');
        }
    };

    const handleEditTeam = () => {
        // Lógica para editar el equipo
        closeTeamOptionsModal();
    };

    const handleDeleteTeam = () => {
        if (selectedTeamIndex !== null) {
            const updatedTeams = [...teams];
            updatedTeams.splice(selectedTeamIndex, 1);
            setTeams(updatedTeams);
        }
        closeTeamOptionsModal();
    };

    const closeTeamOptionsModal = () => {
        setSelectedTeamIndex(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Crear equipo"
                    value={teamName}
                    onChangeText={setTeamName}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTeam}>
                    <Text style={styles.addButtonText}>Añadir</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.teamsContainer}>
                {teams.map((team, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedTeamIndex(index)}>
                        <View style={styles.teamContainer}>
                            <Text style={styles.teamText}>
                                {team}
                            </Text>
                            <FontAwesome5 name="user-plus" size={24} color="black" onPress={() => {
                                // Lógica para agregar personas/jugadores al equipo
                            }} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedTeamIndex !== null && (
                <Modal animationType="slide" transparent={true} visible={true}>
                    <View style={styles.modalContainer}>
                        <Button title="Editar" onPress={handleEditTeam} />
                        <Button title="Eliminar Equipo" color="red" onPress={handleDeleteTeam} />
                        <Button title="Cancelar" onPress={closeTeamOptionsModal} />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#00425A',
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    addButton: {
        backgroundColor: '#FD2525',
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    teamsContainer: {
        marginTop: 10,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    teamText: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default TeamRegistration;
