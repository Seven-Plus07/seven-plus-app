// AddPlayer.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const AddPlayer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const users = [
        "Usuario 1", "Usuario 2", "Usuario 3", "Usuario 4", "Usuario 5",
        "Usuario 6", "Usuario 7", "Usuario 8", "Usuario 9", "Usuario 10"
    ];
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = users.filter(user =>
                user.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar jugador..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});

export default AddPlayer;
