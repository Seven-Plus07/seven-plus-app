import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TeamRegistration = ({navigation, route}) => {
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
        closeTeamOptionsModal();
        navigation.navigate('TeamInfo', { teamName: teams[selectedTeamIndex], teamIndex: selectedTeamIndex });
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

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.updatedTeamName) {
                const updatedTeams = [...teams];
                updatedTeams[route.params.teamIndex] = route.params.updatedTeamName;
                setTeams(updatedTeams);
                navigation.setParams({ updatedTeamName: undefined, teamIndex: undefined });
            }
        }, [route.params])
    );

    // Cuando el componente se monta, carga los equipos del almacenamiento.
    useEffect(() => {
        const loadTeams = async () => {
            const savedTeams = await AsyncStorage.getItem('teams');
            if (savedTeams) {
                setTeams(JSON.parse(savedTeams));
            }
        };

        loadTeams();
    }, []);

    // Cada vez que los equipos cambien, guárdalos en el almacenamiento.
    useEffect(() => {
        const saveTeams = async () => {
            await AsyncStorage.setItem('teams', JSON.stringify(teams));
        };

        saveTeams();
    }, [teams]);

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
                            <FontAwesome5 name="user-plus" size={24} color="#00425A" onPress={() => navigation.navigate('AddPlayer')} />
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
        backgroundColor: '#FD2525',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    teamText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default TeamRegistration;
