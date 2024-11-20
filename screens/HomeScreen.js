import React, { useState } from 'react';
import { Button, View, Text, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Estudiar React', deadline: '2024-11-22', completed: false },
    { id: '2', title: 'Comprar víveres', deadline: '2024-11-21', completed: false }
  ]);

  
  const addTask = (newTask) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: String(prevTasks.length + 1), title: newTask.title, deadline: newTask.deadline, completed: false }
    ]);
  };

  
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

 
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Lista de Tareas</Text>
      
      {}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', flex: 1 }}>
                {item.title} {item.deadline ? `- ${item.deadline}` : ''}
              </Text>
            </TouchableOpacity>
            <Button title="Eliminar" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {}
      <Button 
        title="Agregar Nueva Tarea"
        onPress={() => navigation.navigate('CreateTask', { addTask })}
      />
    </View>
  );
};

export default HomeScreen;
