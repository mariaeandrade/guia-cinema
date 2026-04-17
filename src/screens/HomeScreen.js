import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { Title, Paragraph, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, data }) {
    // Combina filmes e séries para a seção de populares
    const populares = data.filmes.slice(0, 3);

    return (
        <ScrollView style={styles.container}>
            {/* Header com Menu */}
            <View style={styles.header}>
                <Title style={styles.headerTitle}>INÍCIO</Title>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Botões de Navegação */}
            <View style={styles.navButtons}>
                <TouchableOpacity
                    style={[styles.navButton, styles.navButtonActive]}>
                    <Paragraph style={styles.navButtonText}>FILMES</Paragraph>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.getParent().navigate('Catálogo')}>
                    <Paragraph style={styles.navButtonText}>SÉRIES</Paragraph>
                </TouchableOpacity>
            </View>

            {/* Seção de Populares */}
            <View style={styles.sectionContainer}>
                <Title style={styles.sectionTitle}>Populares agora</Title>

                {/* Carrossel de Filmes */}
                <FlatList
                    data={populares}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={[
                                styles.movieCard,
                                index === 0 && styles.firstCard,
                            ]}
                            onPress={() =>
                                navigation.getParent().navigate('Catálogo', {
                                    screen: 'Detalhes',
                                    params: { item },
                                })
                            }>
                            <Image
                                source={{ uri: item.imagem }}
                                style={styles.movieImage}
                            />
                        </TouchableOpacity>
                    )}
                    scrollEventThrottle={16}
                />
            </View>

            {/* Seção de Filmes em Alta */}
            <View style={styles.sectionContainer}>
                <Title style={styles.sectionTitle}>Filmes em alta</Title>
                <View style={styles.highContainer}>
                    {data.filmes.map((filme, index) => (
                        <TouchableOpacity
                            key={filme.id}
                            style={[
                                styles.highCard,
                                index < 2 && styles.highCardRow,
                            ]}
                            onPress={() =>
                                navigation.getParent().navigate('Catálogo', {
                                    screen: 'Detalhes',
                                    params: { item: filme },
                                })
                            }>
                            <Image
                                source={{ uri: filme.imagem }}
                                style={styles.highImage}
                            />
                            <Chip
                                style={styles.badgeChip}
                                textStyle={styles.badgeText}>
                                Filme
                            </Chip>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2a2a3e' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#3a3a50',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        paddingVertical: 20,
    },
    navButton: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#666',
    },
    navButtonActive: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    navButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    sectionContainer: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    movieCard: {
        width: 120,
        height: 180,
        borderRadius: 10,
        marginRight: 12,
        overflow: 'hidden',
    },
    firstCard: {
        marginLeft: 5,
    },
    movieImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    highContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    highCard: {
        width: '48%',
        height: 200,
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    highCardRow: {
        width: '48%',
    },
    highImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badgeChip: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#FF6B6B',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
    },
});
