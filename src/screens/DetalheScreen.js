import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Title, Paragraph, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesScreen({ route }) {
    const { item } = route.params;
    const [watched, setWatched] = useState(false);
    const [liked, setLiked] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

    return (
        <ScrollView style={styles.container}>
            {/* Poster Grande */}
            <Image source={{ uri: item.imagem }} style={styles.poster} />

            {/* Overlay com Título */}
            <View style={styles.titleOverlay}>
                <Title style={styles.mainTitle}>{item.nome}</Title>
            </View>

            {/* Informações Principais */}
            <View style={styles.infoContainer}>
                {/* Chips de Categoria */}
                <View style={styles.chipContainer}>
                    <Chip style={styles.chip} textStyle={styles.chipText}>
                        {item.categoria}
                    </Chip>
                </View>

                {/* Ações */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setWatched(!watched)}>
                        <Ionicons
                            name={watched ? 'eye' : 'eye-outline'}
                            size={28}
                            color={watched ? '#FFD700' : '#999'}
                        />
                        <Paragraph style={styles.actionLabel}>Watched</Paragraph>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setLiked(!liked)}>
                        <Ionicons
                            name={liked ? 'heart' : 'heart-outline'}
                            size={28}
                            color={liked ? '#FF6B6B' : '#999'}
                        />
                        <Paragraph style={styles.actionLabel}>Liked</Paragraph>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setInWatchlist(!inWatchlist)}>
                        <Ionicons
                            name={inWatchlist ? 'bookmark' : 'bookmark-outline'}
                            size={28}
                            color={inWatchlist ? '#FFD700' : '#999'}
                        />
                        <Paragraph style={styles.actionLabel}>Watchlist</Paragraph>
                    </TouchableOpacity>
                </View>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                            key={star}
                            name={star <= 4 ? 'star' : 'star-outline'}
                            size={20}
                            color={star <= 4 ? '#FFD700' : '#666'}
                            style={{ marginRight: 5 }}
                        />
                    ))}
                </View>

                {/* Descrição */}
                <View style={styles.descriptionContainer}>
                    <Title style={styles.sectionTitle}>Sinopse</Title>
                    <Paragraph style={styles.description}>{item.descricao}</Paragraph>
                </View>

                {/* Show Activity */}
                <View style={styles.activityContainer}>
                    <Title style={styles.sectionTitle}>Show your activity</Title>
                    <TouchableOpacity style={styles.reviewButton}>
                        <Paragraph style={styles.reviewText}>Review or log...</Paragraph>
                    </TouchableOpacity>
                </View>

                {/* Add to Lists */}
                <View style={styles.listsContainer}>
                    <TouchableOpacity style={styles.listButton}>
                        <Paragraph style={styles.listButtonText}>Add to lists...</Paragraph>
                    </TouchableOpacity>
                </View>

                {/* Share */}
                <View style={styles.shareContainer}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Ionicons name="share-social-outline" size={24} color="#fff" />
                        <Paragraph style={styles.shareText}>Share</Paragraph>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#2a2a3e' },
    poster: { width: '100%', height: 300, resizeMode: 'cover' },
    titleOverlay: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    mainTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    infoContainer: { paddingHorizontal: 15, paddingVertical: 20 },
    chipContainer: { marginBottom: 15 },
    chip: {
        backgroundColor: '#FF6B6B',
        width: 'auto',
        alignSelf: 'flex-start',
    },
    chipText: { color: '#fff', fontSize: 12 },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#3a3a50',
    },
    actionButton: { alignItems: 'center' },
    actionLabel: { color: '#999', fontSize: 11, marginTop: 5 },
    ratingContainer: { flexDirection: 'row', marginVertical: 15 },
    descriptionContainer: { marginVertical: 15 },
    sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    description: { color: '#ccc', fontSize: 14, lineHeight: 20 },
    activityContainer: { marginVertical: 15 },
    reviewButton: {
        backgroundColor: '#3a3a50',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    reviewText: { color: '#999', fontSize: 14 },
    listsContainer: { marginVertical: 15 },
    listButton: {
        backgroundColor: '#3a3a50',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    listButtonText: { color: '#999', fontSize: 14 },
    shareContainer: { marginVertical: 20, alignItems: 'center', paddingBottom: 30 },
    shareButton: {
        flexDirection: 'row',
        backgroundColor: '#3a3a50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
    },
    shareText: { color: '#fff', fontSize: 14, marginLeft: 8 },
});
