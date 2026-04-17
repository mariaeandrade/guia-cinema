import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';

// Importando Telas e Dados
import ListaScreen from './src/screens/ListaScreen';
import DetalhesScreen from './src/screens/DetalheScreen';
import { SobreScreen, ContatoScreen } from './src/screens/InfoScreens';
import db from './src/data/data.json';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Stack para Filmes
function MovieStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#1e1e1e' },
                headerTintColor: '#fff',
            }}>
            <Stack.Screen name="FilmesLista" options={{ title: 'Catálogo de Filmes' }}>
                {(props) => <ListaScreen {...props} data={db.filmes} titulo="Filmes" />}
            </Stack.Screen>
            <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        </Stack.Navigator>
    );
}

// Stack para Séries
function SeriesStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#1e1e1e' },
                headerTintColor: '#fff',
            }}>
            <Stack.Screen name="SeriesLista" options={{ title: 'Catálogo de Séries' }}>
                {(props) => <ListaScreen {...props} data={db.series} titulo="Séries" />}
            </Stack.Screen>
            <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        </Stack.Navigator>
    );
}

// TabBar Principal
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarStyle: { backgroundColor: '#1e1e1e' },
            }}>
            <Tab.Screen
                name="Filmes"
                component={MovieStack}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="film" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Séries"
                component={SeriesStack}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="tv" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

// Root Navigation (Drawer envolvendo tudo)
export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: '#1e1e1e' },
                        headerTintColor: '#fff',
                        drawerStyle: { backgroundColor: '#1e1e1e' },
                        drawerActiveTintColor: 'tomato',
                        drawerInactiveTintColor: '#ccc',
                    }}>
                    <Drawer.Screen name="Início" component={TabNavigator} />
                    <Drawer.Screen name="Sobre" component={SobreScreen} />
                    <Drawer.Screen name="Contato" component={ContatoScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
