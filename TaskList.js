import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTasks } from './TasksContext';

const TaskList = ({ filter }) => {
  const { tasks, addTask, updateTask, deleteTask, toggleCompleted } = useTasks();
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [priority, setPriority] = useState('medium');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addOrUpdateTask = () => {
    if (input.trim()) {
      if (editingId) {
        updateTask(editingId, { text: input.trim() });
        setEditingId(null);
      } else {
        addTask(input, priority);
      }
      setInput('');
    }
  };

  const editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setInput(task.text);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.taskItem, { borderLeftColor: getPriorityColor(item.priority), borderLeftWidth: 4 }]}>
      <TouchableOpacity onPress={() => toggleCompleted(item.id)} style={styles.checkbox}>
        <Text style={item.completed ? styles.checked : styles.unchecked}>
          {item.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => editTask(item.id)} style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={input}
          onChangeText={setInput}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
          <Text style={styles.addButtonText}>{editingId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    width: 100,
    height: 40,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    minWidth: 80,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    marginRight: 10,
  },
  checked: {
    color: '#28a745',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unchecked: {
    color: '#6c757d',
    fontSize: 18,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 6,
    borderRadius: 4,
    marginRight: 5,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 6,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 50,
  },
});

export default TaskList;