import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const adicionarTarefa = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: Math.random().toString(),
        item: inputValue.trim(),
        editavel: false,
      };
      setData([...data, newItem]);
      setInputValue('');
    }
  };

  const excluirTarefa = (itemId) => {
    setData(data.filter(item => item.id !== itemId));
  };

  const editarTarefa = (itemId, novoTexto) => {
    setData(data.map(item => {
      if (item.id === itemId) {
        return { ...item, item: novoTexto };
      }
      return item;
    }));
  };

  const habilitarEdicao = (itemId) => {
    setData(data.map(item => {
      if (item.id === itemId) {
        return { ...item, editavel: true };
      }
      return item;
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Adicionar tarefa"
        />
        <TouchableOpacity onPress={adicionarTarefa} style={styles.addButton}>
          <Entypo name='circle-with-plus' size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* listagem dos itens */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TextInput
              style={[styles.itemInput, !item.editavel && { backgroundColor: 'transparent' }]}
              value={item.item}
              onChangeText={(text) => editarTarefa(item.id, text)}
              editable={item.editavel}
            />
            {!item.editavel && (
              <TouchableOpacity onPress={() => habilitarEdicao(item.id)}>
                <Entypo name='edit' size={28} color="#555" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => excluirTarefa(item.id)}>
              <Entypo name='circle-with-minus' size={28} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '70%',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemInput: {
    flex: 1,
    marginRight: 12,
  },
});
