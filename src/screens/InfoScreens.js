import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export function MenuScreen({ navigation }) {
    const menuItems = [
        { label: 'Minha Lista', icon: 'bookmark-outline', divider: true },
        { label: 'Histórico', icon: 'time-outline' },
        { label: 'Minhas avaliações', icon: 'star-outline', divider: true },
        { label: 'Downloads', icon: 'download-outline', divider: true },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Title style={styles.avatar}>DC</Title>
                </View>
                <View style={styles.profileInfo}>
                    <Title style={styles.userName}>Daniel Casalli</Title>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.screen) navigation.navigate(item.screen);
                            }}>
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color="#fff"
                                style={styles.menuIcon}
                            />
                            <Paragraph style={styles.menuLabel}>{item.label}</Paragraph>
                        </TouchableOpacity>
                        {item.divider && <View style={styles.divider} />}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

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
        backgroundColor: '#2a2a3e',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#3a3a50',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF9966',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    avatar: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuContainer: {
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    menuIcon: {
        marginRight: 20,
    },
    menuLabel: {
        color: '#ccc',
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#3a3a50',
        marginVertical: 10,
    },
    title: {
        color: '#fff',
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        color: '#ccc',
        lineHeight: 24,
        marginBottom: 15,
        marginHorizontal: 20,
    },
});

