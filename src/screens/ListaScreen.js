import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native';

export default function ListaScreen({ navigation, data, titulo }) {
    return (
        <View style={styles.container}>
            <Title style={styles.header}>{titulo}</Title>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        onPress={() => navigation.navigate('Detalhes', { item })}>
                        <Card.Cover source={{ uri: item.imagem }} />
                        <Card.Content>
                            <Title>{item.nome}</Title>
                            <Paragraph numberOfLines={2}>{item.descricao}</Paragraph>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 10 },
    header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    card: {
        marginBottom: 10,
        backgroundColor: '#1e1e1e',
    },
});
