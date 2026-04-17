import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';

// Importando Telas e Dados
import HomeScreen from './src/screens/HomeScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalhesScreen from './src/screens/DetalheScreen';
import { MenuScreen, SobreScreen, ContatoScreen } from './src/screens/InfoScreens';
import db from './src/data/data.json';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Stack para Home
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" options={{ title: 'Início' }}>
                {(props) => <HomeScreen {...props} data={db} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

// Stack para Catálogo
function CatalogoStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="CatalogoScreen" options={{ title: 'Catálogo' }}>
                {(props) => <CatalogoScreen {...props} data={db} />}
            </Stack.Screen>
            <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes' }} />
        </Stack.Navigator>
    );
}

// TabBar Principal
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FFD700',
                tabBarInactiveTintColor: '#666',
                tabBarStyle: {
                    backgroundColor: '#3a3a50',
                    borderTopColor: '#2a2a3e',
                    borderTopWidth: 1,
                },
            }}>
            <Tab.Screen
                name="Início"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    tabBarLabel: 'Início',
                }}
            />
            <Tab.Screen
                name="Catálogo"
                component={CatalogoStack}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
                    tabBarLabel: 'Catálogo',
                }}
            />
        </Tab.Navigator>
    );
}

// Root Navigation com Drawer
export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: '#2a2a3e',
                            width: '80%',
                        },
                        drawerActiveTintColor: '#FFD700',
                        drawerInactiveTintColor: '#ccc',
                        drawerContentStyle: {
                            backgroundColor: '#2a2a3e',
                        },
                    }}>
                    <Drawer.Screen
                        name="TabNavigator"
                        component={TabNavigator}
                        options={{
                            drawerLabel: 'Início',
                            drawerIcon: ({ color }) => (
                                <Ionicons name="home" size={24} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Menu"
                        component={MenuScreen}
                        options={{
                            drawerLabel: 'Perfil',
                            drawerIcon: ({ color }) => (
                                <Ionicons name="person" size={24} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Sobre"
                        component={SobreScreen}
                        options={{
                            drawerLabel: 'Sobre',
                            drawerIcon: ({ color }) => (
                                <Ionicons name="information-circle" size={24} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="Contato"
                        component={ContatoScreen}
                        options={{
                            drawerLabel: 'Contato',
                            drawerIcon: ({ color }) => (
                                <Ionicons name="mail" size={24} color={color} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
