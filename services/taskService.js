// /services/taskService.js
import { db } from '../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Función para obtener todas las tareas
export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'TodoList'));
    const tasksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasksList;
  } catch (error) {
    console.error('Error getting tasks: ', error);
    return [];
  }
};

// Función para agregar una nueva tarea
export const addTask = async (title, deadline) => {
  try {
    const newTask = { title, deadline, completed: false };
    await addDoc(collection(db, 'TodoList'), newTask);
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

// Función para eliminar una tarea
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'TodoList', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};
