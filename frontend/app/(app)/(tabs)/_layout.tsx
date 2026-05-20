import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

// Botão central 
function CustomAddButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Ionicons name="add" size={32} color={Colors.primaryForeground} />
    </TouchableOpacity>
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      {/* Aba Início */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Aba Buscar */}
      <Tabs.Screen
        name="busca"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Botão central + */}
      <Tabs.Screen
        name="criar-publicacao"
        options={{
          title: '',
          tabBarButton: (props) => (
            <CustomAddButton onPress={props.onPress as () => void} />
          ),
        }}

      />

      {/* Aba Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  )
}

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
})