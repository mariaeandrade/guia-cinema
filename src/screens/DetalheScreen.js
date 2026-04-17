import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';

export default function DetalhesScreen({ route }) {
    const { item } = route.params; // Recebendo os dados via parâmetro

    return (
        <ScrollView style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: item.imagem }} />
                <Card.Content>
                    <Title>{item.nome}</Title>
                    <Chip style={styles.chip}>{item.categoria}</Chip>
                    <Paragraph>{item.descricao}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 10 },
    chip: { marginVertical: 8, backgroundColor: 'tomato' },
});
