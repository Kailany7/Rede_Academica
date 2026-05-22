import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Colors from '../../../constants/Colors'

// Botão central personalizado — o + azul redondo
function CustomAddButton({ onPress }: { onPress: () => void }) {
  return (
    // View container para centralizar o botão na tab bar
    <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Ionicons name="add" size={32} color={Colors.primaryForeground} />
      </TouchableOpacity>
    </View>
  )
}

import {
  TouchableOpacity,
  View
} from 'react-native'

export default function TabsLayout() {

  return (

    <Tabs>

      {/* FEED */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* CRIAR PUBLICAÇÃO */}
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

          // Remove texto
          tabBarLabel: '',

          // Botão customizado
          tabBarButton: (props: any) => (

            <TouchableOpacity
              {...props}
              activeOpacity={0.9}

              style={{
                top: -22,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >

              {/* Círculo azul externo */}
              <View
                style={{
                  width: 72,
                  height: 72,

                  borderRadius: 36,

                  backgroundColor: '#0A4174',

                  justifyContent: 'center',
                  alignItems: 'center',

                  // Sombra
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },

                  shadowOpacity: 0.18,
                  shadowRadius: 8,

                  elevation: 8,
                }}
              >

                {/* Círculo branco interno */}
                <View
                  style={{
                    width: 54,
                    height: 54,

                    borderRadius: 27,

                    backgroundColor: '#FFFFFF',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >

                  {/* Ícone + */}
                  <Ionicons
                    name="add"
                    size={30}
                    color="#0A4174"
                  />

                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/* PERFIL */}
          tabBarButton: (props) => (
            <CustomAddButton onPress={props.onPress as () => void} />
          ),
        }}
      />

      {/* Aba Rede de Conexões */}
      <Tabs.Screen
        name="rede-conexoes"
        options={{
          title: 'Conexões',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Aba Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  )
}
}

const styles = StyleSheet.create({
  // container que centraliza o botão + na tab bar
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
