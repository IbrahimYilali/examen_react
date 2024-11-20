// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert } from 'react-native';
import { getTasks, addTask, deleteTask } from './services/taskService'; // Importamos las funciones

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    addTask(newTask, deadline).then(() => {
      setNewTask('');
      setDeadline('');
     
      getTasks().then(fetchedTasks => setTasks(fetchedTasks));
    });
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => {
          deleteTask(taskId).then(() => {
            setTasks(tasks.filter(task => task.id !== taskId));
          });
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
        {item.title} {item.deadline && `- ${item.deadline}`}
      </Text>
      <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Task Title"
        value={newTask}
        onChangeText={setNewTask}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Deadline"
        value={deadline}
        onChangeText={setDeadline}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
