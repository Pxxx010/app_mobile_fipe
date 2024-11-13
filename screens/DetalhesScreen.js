import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import axios from 'axios';

export default function DetalhesScreen({ route }) {
  const { anoId, modeloId, marcaId } = route.params;
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`)
      .then(response => {
        setDetalhes(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [anoId, modeloId, marcaId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>🚗 Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.carImage} 
        source={{ uri: 'https://source.unsplash.com/featured/?car' }} 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>🚙 {detalhes.Modelo}</Text>
        <Text style={styles.detailText}>📅 Ano: {detalhes.AnoModelo}</Text>
        <Text style={styles.detailText}>⛽ Combustível: {detalhes.Combustivel}</Text>
        <Text style={styles.detailText}>💰 Valor: {detalhes.Valor}</Text>
        <Text style={styles.detailText}>🏢 Marca: {detalhes.Marca}</Text>
        <Text style={styles.detailText}>📋 Código FIPE: {detalhes.CodigoFipe}</Text>
        <Text style={styles.footerText}>📅 Referência: {detalhes.MesReferencia}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 16,
  },
  carImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  footerText: {
    fontSize: 14,
    marginTop: 12,
    color: '#999',
    textAlign: 'center',
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
});
