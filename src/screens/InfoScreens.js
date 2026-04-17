import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

export function SobreScreen() {
    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Sobre o Guia de Filmes e Séries</Title>
            <Paragraph style={styles.text}>
                Bem-vindo ao Guia de Filmes e Séries! Este aplicativo foi desenvolvido para ajudar
                você a descobrir e explorar os melhores conteúdos de entretenimento.
            </Paragraph>
            <Paragraph style={styles.text}>
                Navegue pelas abas de Filmes e Séries para ver listas atualizadas, e clique em
                qualquer item para ver detalhes completos.
            </Paragraph>
            <Paragraph style={styles.text}>
                Desenvolvido com React Native e Expo, utilizando navegação intuitiva com Drawer e
                Tabs.
            </Paragraph>
        </ScrollView>
    );
}

export function ContatoScreen() {
    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Contato</Title>
            <Paragraph style={styles.text}>Entre em contato conosco:</Paragraph>
            <Paragraph style={styles.text}>Email: contato@guiafilmes.com</Paragraph>
            <Paragraph style={styles.text}>Telefone: (11) 99999-9999</Paragraph>
            <Paragraph style={styles.text}>Website: www.guiafilmes.com</Paragraph>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        color: '#ccc',
        lineHeight: 24,
        marginBottom: 15,
    },
});
