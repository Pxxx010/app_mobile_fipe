import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [marcas, setMarcas] = useState([]);
  const [filteredMarcas, setFilteredMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Busca as marcas ao carregar a tela
    axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(response => {
        setMarcas(response.data);
        setFilteredMarcas(response.data); // Inicializa a lista filtrada
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  // Filtra as marcas com base na busca do usuário
  const handleSearch = (text) => {
    setSearch(text);
    const filtered = marcas.filter(marca =>
      marca.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMarcas(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Carregando marcas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar marca..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMarcas}
        keyExtractor={(item) => item.codigo.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('Modelos', { marcaId: item.codigo })}
          >
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma marca encontrada.</Text>
          </View>
        )}
      />
    </View>
  );
}

// Estilos aprimorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  item: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});
