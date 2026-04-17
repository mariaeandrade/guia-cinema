import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Title, Paragraph, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ListaScreen({ navigation, titulo }) {
    const [data, setData] = useState([]);
    const [filtro, setFiltro] = useState('TODOS');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = 'your_api_key_here'; // Obtenha sua chave em https://www.themoviedb.org/settings/api
            const type = titulo === 'Filmes' ? 'movie' : 'tv';
            const url = `https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}&language=pt-BR`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                const items = json.results.map((item) => ({
                    id: item.id.toString(),
                    nome: item.title || item.name,
                    descricao: item.overview || 'Descrição não disponível.',
                    imagem: item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sem+Imagem',
                    categoria: titulo === 'Filmes' ? 'Filme' : 'Série',
                }));
                setData(items);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [titulo]);

    const dadosFiltrados = data.filter((item) => {
        const match = item.nome.toLowerCase().includes(busca.toLowerCase());
        if (filtro === 'TODOS') return match;
        return match; // Você pode adicionar lógica de categoria aqui
    });

    return (
        <View style={styles.container}>
            {/* Header com Catálogo */}
            <View style={styles.headerSection}>
                <Title style={styles.title}>CATÁLOGO</Title>

                {/* Barra de Busca */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar séries e filmes..."
                        placeholderTextColor="#666"
                        value={busca}
                        onChangeText={setBusca}
                    />
                </View>

                {/* Filtros */}
                <View style={styles.filterContainer}>
                    {['TODOS', 'FILMES', 'SÉRIES'].map((filtro_item) => (
                        <TouchableOpacity
                            key={filtro_item}
                            style={[
                                styles.filterButton,
                                filtro === filtro_item && styles.filterButtonActive,
                            ]}
                            onPress={() => setFiltro(filtro_item)}>
                            <Paragraph
                                style={[
                                    styles.filterText,
                                    filtro === filtro_item && styles.filterTextActive,
                                ]}>
                                {filtro_item}
                            </Paragraph>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Lista de Conteúdo */}
            <FlatList
                data={dadosFiltrados}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Detalhes', { item })}>
                        <Image source={{ uri: item.imagem }} style={styles.poster} />
                        <View style={styles.cardContent}>
                            <Paragraph style={styles.cardTitle} numberOfLines={2}>
                                {item.nome}
                            </Paragraph>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2a2a3e', paddingTop: 20 },
    headerSection: { paddingHorizontal: 15, marginBottom: 20 },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a3a50',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 45,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
    },
    filterContainer: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#666',
    },
    filterButtonActive: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
    filterText: { color: '#999', fontSize: 12, fontWeight: 'bold' },
    filterTextActive: { color: '#000', fontWeight: 'bold' },
    row: { justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15 },
    card: { width: '48%', marginHorizontal: 5 },
    poster: { width: '100%', height: 180, borderRadius: 10, backgroundColor: '#3a3a50' },
    cardContent: { marginTop: 8 },
    cardTitle: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
