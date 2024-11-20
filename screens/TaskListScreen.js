import React, { useState } from 'react';
import { FlatList, View, Text, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';  // Importa desde el nuevo paquete

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', deadline: '2024-12-01', done: false },
    { id: '2', title: 'Task 2', deadline: '', done: false },
    { id: '3', title: 'Task 3', deadline: '2024-12-10', done: false },
  ]);

  const handleDelete = (taskId) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => setTasks(tasks.filter(task => task.id !== taskId)),
      },
    ]);
  };

  const toggleTaskDone = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
              <CheckBox
                value={item.done}
                onValueChange={() => toggleTaskDone(item.id)}
              />
            </TouchableOpacity>
            <Text style={item.done ? styles.doneTask : styles.taskText}>
              {item.title}{item.deadline ? ` - ${item.deadline}` : ''}
            </Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('CreateTask', { addTask: setTasks, tasks })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
  doneTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
});

export default TaskListScreen;
