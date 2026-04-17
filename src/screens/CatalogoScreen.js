import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Title, Paragraph, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function CatalogoScreen({ navigation, data }) {
    const [filtro, setFiltro] = useState('TODOS');
    const [busca, setBusca] = useState('');

    // Combinar filmes e séries com tipo
    const todosConteudos = [
        ...data.filmes.map(item => ({ ...item, tipo: 'Filme' })),
        ...data.series.map(item => ({ ...item, tipo: 'Série' })),
    ];

    // Filtrar por tipo e busca
    const dadosFiltrados = todosConteudos.filter((item) => {
        const match = item.nome.toLowerCase().includes(busca.toLowerCase());
        if (filtro === 'TODOS') return match;
        if (filtro === 'FILMES') return match && item.tipo === 'Filme';
        if (filtro === 'SÉRIES') return match && item.tipo === 'Série';
        return match;
    });

    return (
        <View style={styles.container}>
            {/* Header com Catálogo */}
            <View style={styles.headerSection}>
                <View style={styles.headerTop}>
                    <Title style={styles.title}>CATÁLOGO</Title>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

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
                        <View style={styles.posterContainer}>
                            <Image source={{ uri: item.imagem }} style={styles.poster} />
                            <Chip style={styles.typeBadge} textStyle={styles.typeBadgeText}>
                                {item.tipo}
                            </Chip>
                        </View>
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
    container: { flex: 1, backgroundColor: '#2a2a3e', paddingTop: 0 },
    headerSection: { paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#3a3a50' },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a3e',
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
    row: { justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, marginTop: 15 },
    card: { width: '48%' },
    posterContainer: { position: 'relative' },
    poster: { width: '100%', height: 180, borderRadius: 10, backgroundColor: '#3a3a50' },
    typeBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF6B6B',
    },
    typeBadgeText: { color: '#fff', fontSize: 10 },
    cardContent: { marginTop: 8 },
    cardTitle: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
