import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const CreateTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = () => {
    if (title.trim() === '') {
      Alert.alert("Error", "El títol és obligatori.");
      return;
    }
    const newTask = { id: Date.now().toString(), title, deadline, done: false };
    route.params.addTask(newTask);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Títol de la tasca"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Data de venciment"
        value={deadline}
        onChangeText={setDeadline}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <Button title="Afegir tasca" onPress={handleAddTask} />
    </View>
  );
};

export default CreateTaskScreen;
