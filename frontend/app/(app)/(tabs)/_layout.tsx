import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,        // remove a faixa branca com o nome da tela
        tabBarActiveTintColor: Colors.primary,   // cor do ícone ativo
        tabBarInactiveTintColor: Colors.mutedForeground, // cor do ícone inativo
        tabBarStyle: {
          backgroundColor: Colors.card, // fundo da tab bar
          borderTopColor: Colors.border, // linha do topo
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="criar-publicacao"
        options={{
          title: 'Criar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="busca"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  )
}